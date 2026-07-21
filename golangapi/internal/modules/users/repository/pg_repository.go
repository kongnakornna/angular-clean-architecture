package repository

import (
	"context"
	"errors"
	"strings"
	"time"

	"icmongolang/internal/models"
	"icmongolang/internal/repository"
	"icmongolang/internal/modules/users"
	"icmongolang/pkg/cryptpass"

	"gorm.io/gorm"
)

type UserPgRepo struct {
	repository.PgRepo[models.SdUser]
}

func CreateUserPgRepository(db *gorm.DB) users.UserPgRepository {
	return &UserPgRepo{
		PgRepo: repository.CreatePgRepo[models.SdUser](db),
	}
}

func (r *UserPgRepo) GetByEmail(ctx context.Context, identifier string) (*models.SdUser, error) {
	normalized := strings.ToLower(strings.TrimSpace(identifier))

	var user models.SdUser

	// 1. Try email
	result := r.DB.WithContext(ctx).First(&user, "email = ?", normalized)
	if result.Error == nil {
		return &user, nil
	}
	// If it's a real DB error (not "not found"), return it immediately
	if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, result.Error
	}

	// 2. Email not found → try username
	result = r.DB.WithContext(ctx).First(&user, "username = ?", normalized)
	if result.Error != nil {
		// This could be "not found" or any other error – return as is
		return nil, result.Error
	}
	return &user, nil
}

func (r *UserPgRepo) UpdatePassword(ctx context.Context, exp *models.SdUser, newPassword string) (*models.SdUser, error) {
	if result := r.DB.WithContext(ctx).Model(&exp).Select("password").
		Updates(map[string]interface{}{"password": newPassword}); result.Error != nil {
		return nil, result.Error
	}
	return exp, nil
}

func (r *UserPgRepo) UpdateVerificationCode(ctx context.Context, exp *models.SdUser, newVerificationCode string) (*models.SdUser, error) {
	if result := r.DB.WithContext(ctx).Model(&exp).Select("verification_code").
		Updates(map[string]interface{}{"verification_code": newVerificationCode}); result.Error != nil {
		return nil, result.Error
	}
	return exp, nil
}

func (r *UserPgRepo) UpdateVerification(ctx context.Context, exp *models.SdUser, newVerificationCode string, newVerified bool) (*models.SdUser, error) {
	if result := r.DB.WithContext(ctx).Model(&exp).Select("verification_code", "verified").
		Updates(map[string]interface{}{
			"verification_code": newVerificationCode,
			"verified":          newVerified,
		}); result.Error != nil {
		return nil, result.Error
	}
	return exp, nil
}

func (r *UserPgRepo) GetByVerificationCode(ctx context.Context, verificationCode string) (*models.SdUser, error) {
	var obj *models.SdUser
	if result := r.DB.WithContext(ctx).First(&obj, "verification_code = ?", verificationCode); result.Error != nil {
		return nil, result.Error
	}
	return obj, nil
}

func (r *UserPgRepo) UpdatePasswordReset(ctx context.Context, exp *models.SdUser, passwordResetToken string, passwordResetAt time.Time) (*models.SdUser, error) {
	if result := r.DB.WithContext(ctx).Model(&exp).Select("password_reset_token", "password_reset_at").
		Updates(map[string]interface{}{
			"password_reset_token": passwordResetToken,
			"password_reset_at":    passwordResetAt,
		}); result.Error != nil {
		return nil, result.Error
	}
	return exp, nil
}

func (r *UserPgRepo) GetByResetToken(ctx context.Context, resetToken string) (*models.SdUser, error) {
	var obj *models.SdUser
	if result := r.DB.WithContext(ctx).First(&obj, "reset_token = ?", resetToken); result.Error != nil {
		return nil, result.Error
	}
	return obj, nil
}

func (r *UserPgRepo) GetByResetTokenResetAt(ctx context.Context, resetToken string, resetAt time.Time) (*models.SdUser, error) {
	var obj *models.SdUser
	if result := r.DB.WithContext(ctx).First(&obj, "password_reset_token = ? AND password_reset_at > ?", resetToken, resetAt); result.Error != nil {
		return nil, result.Error
	}
	return obj, nil
}

func (r *UserPgRepo) UpdatePasswordResetToken(ctx context.Context, exp *models.SdUser, newPassword string, resetToken string) (*models.SdUser, error) {
	if result := r.DB.WithContext(ctx).Model(&exp).Select("password", "password_reset_token").
		Updates(map[string]interface{}{"password": newPassword, "password_reset_token": resetToken}); result.Error != nil {
		return nil, result.Error
	}
	return exp, nil
}

// =========================== ADVANCED QUERIES ===========================
// InsertUserWithFields creates a new user using separate parameters.
// InsertUserWithFields สร้างผู้ใช้ใหม่โดยรับค่าฟิลด์แบบแยกตัวแปร
func (r *UserPgRepo) InsertUserWithFields(
	ctx context.Context,
	username string,
	email string,
	passwordHash string,
	roleID int,
	firstname, lastname, fullname *string,
	status int16,
	isSuperUser bool,
	verified bool,
) (*models.SdUser, error) {
	user := &models.SdUser{
		Username:    username,
		Email:       email,
		Password:    passwordHash,
		RoleID:      roleID,
		Firstname:   firstname,
		Lastname:    lastname,
		Fullname:    fullname,
		Status:      status,
		IsSuperUser: isSuperUser,
		Verified:    verified,
	}
	// กำหนด Username ถ้ายังไม่มี
	if user.Username == "" {
		user.Username = email
	} else {
		user.Username = username
	}
	// บันทึกลงฐานข้อมูล
	if err := r.DB.WithContext(ctx).Create(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

// InsertUserWithMap creates a new user using a map of field names to values.
// InsertUserWithMap สร้างผู้ใช้ใหม่โดยใช้ map ชื่อฟิลด์ -> ค่า (พร้อมเข้ารหัสรหัสผ่าน)
/*
	ตัวอย่างการเรียกใช้
		fields := map[string]interface{}{
			"email":    "john@example.com",
			"password": "mysecret123",   // plain text จะถูก hash อัตโนมัติ
			"role_id":  2,
			"firstname": stringPtr("John"),
			"lastname":  stringPtr("Doe"),
			"verified":  false,
		}
		user, err := pgRepo.InsertUserWithMap(ctx, fields)

	### คำอธิบายเพิ่มเติม
		- `cryptpass.HashPassword` ใช้ bcrypt ซึ่งมี salt in-built และปลอดภัย
		- ฟิลด์ `PasswordTemp` (ถ้ามีใน model) สามารถเก็บ plain text ได้ แต่ **ไม่ควรทำใน production** เพราะเสี่ยงด้านความปลอดภัย ยกเว้นเพื่อการ debug ชั่วคราว
		- ฟังก์ชันนี้จะ hash password ทุกครั้งก่อน `Create` ดังนั้น caller ไม่ต้อง hash ล่วงหน้า
		### การใช้ร่วมกับ existing logic
		ใน usecase `Create` เดิมก็มีการ hash ก่อนเรียก `pgRepo.Create` เช่นกัน ดังนั้นการเรียก `InsertUserWithMap`
		โดยตรงก็จะได้ผลลัพธ์เดียวกัน (รหัสผ่านถูก hash) แต่เพิ่มความสะดวกในการส่งข้อมูลเป็น map
		หากต้องการใช้ `PasswordTemp` จริง ๆ ควรลบหรือ comment ออกเมื่อขึ้น production ครับ
*/
func (r *UserPgRepo) InsertUserWithMap(ctx context.Context, fields map[string]interface{}) (*models.SdUser, error) {
	user := &models.SdUser{}

	// email และ username (required)
	if email, ok := fields["email"]; ok {
		user.Email = email.(string)
	} else if username, ok := fields["username"]; ok {
		user.Username = username.(string)
	}

	// password: รับค่ามาแล้วเข้ารหัส (hash) ก่อนเก็บ
	if rawPassword, ok := fields["password"]; ok {
		plainPassword := rawPassword.(string)
		// เข้ารหัสด้วย bcrypt
		hashedPassword, err := cryptpass.HashPassword(plainPassword)
		if err != nil {
			return nil, err
		}
		user.Password = hashedPassword
		// ถ้าต้องการเก็บ plain text ไว้ชั่วคราว (ไม่แนะนำ) ก็ทำได้
		if _, ok := fields["password_temp"]; ok {
			//user.PasswordTemp = plainPassword
		}
	}

	// role_id
	if roleID, ok := fields["role_id"]; ok {
		user.RoleID = roleID.(int)
	}

	// optional fields
	if firstname, ok := fields["firstname"]; ok {
		user.Firstname = firstname.(*string)
	}
	if lastname, ok := fields["lastname"]; ok {
		user.Lastname = lastname.(*string)
	}
	if fullname, ok := fields["fullname"]; ok {
		user.Fullname = fullname.(*string)
	}
	if status, ok := fields["status"]; ok {
		user.Status = status.(int16)
	} else {
		user.Status = 1 // default active
	}
	if isSuper, ok := fields["is_superuser"]; ok {
		user.IsSuperUser = isSuper.(bool)
	}
	if verified, ok := fields["verified"]; ok {
		user.Verified = verified.(bool)
	}

	// บันทึกผ่าน GORM
	if err := r.DB.WithContext(ctx).Create(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

// BatchInsertUsers inserts multiple users in a single database call.
// BatchInsertUsers แทรกผู้ใช้หลายคนในคำสั่งเดียว
func (r *UserPgRepo) BatchInsertUsers(ctx context.Context, users []*models.SdUser, batchSize int) error {
	if len(users) == 0 {
		return nil
	}
	// GORM CreateInBatches จะแบ่งเป็นชุดย่อยตาม batchSize
	return r.DB.WithContext(ctx).CreateInBatches(users, batchSize).Error
}

// These additions provide:
// - Dynamic filtering with pagination & sorting (`FilterUsers`)
// - Statistics using `CASE` (`GetUserStatistics`)
// - Bulk updates (`BulkUpdateStatus`)
// - Conditional role update (`UpdateRoleBasedOnSuperuser`)
// - Date range query (`GetUsersByDateRange`)
// - Role name transformation (`GetActiveUsersWithRoleNames`)
// - Upsert example (`UpsertUserVerificationCode`)

// FilterRequest defines optional filters for dynamic user listing
// FilterRequest กำหนดตัวกรองสำหรับการค้นหาผู้ใช้แบบไดนามิก
type FilterRequest struct {
	Username    string  // partial match (ILIKE)
	Email       string  // partial match (ILIKE)
	Status      *int16  // 1 active, 0 inactive
	RoleID      *int    // role id
	Verified    *bool   // email verified or not
	IsSuperUser *bool   // superuser flag
	LocationID  *string // exact match
	Limit       int     // page size
	Offset      int     // offset for pagination
	SortField   string  // field name for sorting (e.g., "createddate", "email")
	SortOrder   string  // "ASC" or "DESC"
}

// FilterUsers - กรองผู้ใช้ตามเงื่อนไขที่ส่งมาแบบ dynamic (สำหรับ SdUser)
// FilterUsers - Dynamically filters users based on provided conditions (for SdUser)
func (r *UserPgRepo) FilterUsers(ctx context.Context, filters map[string]interface{}) ([]*models.SdUser, int64, error) {
	var users []*models.SdUser
	var total int64

	query := r.DB.WithContext(ctx).Model(&models.SdUser{})

	// กรณีค้นหาด้วย fullname แบบ partial match (case-insensitive)
	if fullname, ok := filters["fullname"].(string); ok && fullname != "" {
		query = query.Where("fullname ILIKE ?", "%"+fullname+"%")
	}
	// หรือค้นหาด้วย firstname/lastname
	if firstname, ok := filters["firstname"].(string); ok && firstname != "" {
		query = query.Where("firstname ILIKE ?", "%"+firstname+"%")
	}
	if lastname, ok := filters["lastname"].(string); ok && lastname != "" {
		query = query.Where("lastname ILIKE ?", "%"+lastname+"%")
	}

	// username
	if username, ok := filters["username"].(string); ok && username != "" {
		query = query.Where("username ILIKE ?", "%"+username+"%")
	}
	// email แบบ partial match
	if email, ok := filters["email"].(string); ok && email != "" {
		query = query.Where("email ILIKE ?", "%"+email+"%")
	}
	// status (single)
	if status, ok := filters["status"].(int16); ok {
		query = query.Where("status = ?", status)
	}
	// statuses (array)
	if statuses, ok := filters["statuses"].([]int16); ok && len(statuses) > 0 {
		query = query.Where("status IN ?", statuses)
	}
	// role_id
	if roleID, ok := filters["role_id"].(int); ok && roleID > 0 {
		query = query.Where("role_id = ?", roleID)
	}
	// verified
	if verified, ok := filters["verified"].(bool); ok {
		query = query.Where("verified = ?", verified)
	}
	// is_superuser
	if isSuper, ok := filters["is_superuser"].(bool); ok {
		query = query.Where("is_superuser = ?", isSuper)
	}
	// location_id
	if locationID, ok := filters["location_id"].(string); ok && locationID != "" {
		query = query.Where("location_id = ?", locationID)
	}
	// ช่วงวันที่ createddate
	if startDate, ok := filters["start_date"].(time.Time); ok && !startDate.IsZero() {
		query = query.Where("createddate >= ?", startDate)
	}
	if endDate, ok := filters["end_date"].(time.Time); ok && !endDate.IsZero() {
		query = query.Where("createddate <= ?", endDate)
	}

	// การเรียงลำดับ
	if sortBy, ok := filters["sort_by"].(string); ok && sortBy != "" {
		// แปลงชื่อฟิลด์จาก json tag หรือชื่อที่ใช้ใน API ให้เป็น column name
		switch sortBy {
		case "fullname", "firstname", "lastname", "username", "email", "status", "role_id", "verified", "is_superuser", "location_id":
			// ใช้ได้เลย
		case "created_at":
			sortBy = "createddate"
		case "updated_at":
			sortBy = "updated_date"
		default:
			sortBy = "createddate"
		}
		sortOrder := "ASC"
		if order, ok := filters["sort_order"].(string); ok && order == "desc" {
			sortOrder = "DESC"
		}
		query = query.Order(sortBy + " " + sortOrder)
	} else {
		query = query.Order("createddate DESC")
	}

	// Pagination
	limit := 20
	if l, ok := filters["limit"].(int); ok && l > 0 {
		limit = l
	}
	offset := 0
	if o, ok := filters["offset"].(int); ok && o >= 0 {
		offset = o
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	err := query.Limit(limit).Offset(offset).Find(&users).Error
	return users, total, err
}

// UserStatusCount represents aggregated user counts by status/role.
// UserStatusCount แสดงผลรวมผู้ใช้แยกตามสถานะหรือบทบาท
type UserStatusCount struct {
	Status     string `gorm:"column:status_label"`
	Count      int64  `gorm:"column:count"`
	RoleName   string `gorm:"column:role_name"`
	SuperCount int64  `gorm:"column:super_count"`
}

// GetUserStatistics returns aggregated statistics using CASE statements.
// GetUserStatistics คืนค่าสถิติรวมของผู้ใช้โดยใช้ CASE statements
func (r *UserPgRepo) GetUserStatistics(ctx context.Context) ([]UserStatusCount, error) {
	var stats []UserStatusCount

	// Using CASE to convert numeric status to readable label, and counting by role
	// ใช้ CASE เพื่อแปลงสถานะตัวเลขเป็นข้อความที่อ่านได้ และนับจำนวนตามบทบาท
	err := r.DB.WithContext(ctx).Model(&models.SdUser{}).
		Select(`
			CASE 
				WHEN status = 1 THEN 'Active'
				WHEN status = 0 THEN 'Inactive'
				ELSE 'Unknown'
			END as status_label,
			CASE role_id
				WHEN 1 THEN 'Super Admin'
				WHEN 2 THEN 'Normal User'
				ELSE 'Other'
			END as role_name,
			COUNT(*) as count,
			SUM(CASE WHEN is_superuser = true THEN 1 ELSE 0 END) as super_count
		`).
		Group("status_label, role_name").
		Order("status_label, role_name").
		Scan(&stats).Error

	return stats, err
}

// BulkUpdateStatus updates status for multiple users based on a condition (using CASE).
// BulkUpdateStatus อัปเดตสถานะผู้ใช้หลายคนตามเงื่อนไข (ใช้ CASE)
func (r *UserPgRepo) BulkUpdateStatus(ctx context.Context, userIDs []string, newStatus int16) error {
	if len(userIDs) == 0 {
		return nil
	}
	// Update in one query using WHERE IN
	// อัปเดตใน query เดียวโดยใช้ WHERE IN
	return r.DB.WithContext(ctx).Model(&models.SdUser{}).
		Where("id IN ?", userIDs).
		Update("status", newStatus).Error
}

// UpdateRoleBasedOnSuperuser updates role_id using CASE: if is_superuser true then role_id=1 else keep existing.
// UpdateRoleBasedOnSuperuser อัปเดต role_id โดยใช้ CASE: ถ้า is_superuser เป็นจริงให้ role_id=1 มิฉะนั้นคงค่าเดิม
func (r *UserPgRepo) UpdateRoleBasedOnSuperuser(ctx context.Context) error {
	// Use gorm.Expr with CASE
	// ใช้ gorm.Expr ร่วมกับ CASE
	return r.DB.WithContext(ctx).Model(&models.SdUser{}).
		Where("is_superuser = true").
		Update("role_id", gorm.Expr("CASE WHEN is_superuser = true THEN 1 ELSE role_id END")).Error
}

// GetUsersByDateRange returns users created between two dates with optional sorting.
// GetUsersByDateRange คืนค่าผู้ใช้ที่สร้างในช่วงวันที่กำหนด พร้อมเรียงลำดับ
func (r *UserPgRepo) GetUsersByDateRange(ctx context.Context, from, to time.Time, limit int) ([]*models.SdUser, error) {
	var users []*models.SdUser
	query := r.DB.WithContext(ctx).Where("createddate BETWEEN ? AND ?", from, to)
	if limit > 0 {
		query = query.Limit(limit)
	}
	err := query.Order("createddate DESC").Find(&users).Error
	return users, err
}

// GetActiveUsersWithRoleNames returns active users with role names derived via CASE.
// GetActiveUsersWithRoleNames คืนค่าผู้ใช้ที่ active พร้อมชื่อบทบาทที่ได้จาก CASE
func (r *UserPgRepo) GetActiveUsersWithRoleNames(ctx context.Context) ([]map[string]interface{}, error) {
	var results []map[string]interface{}
	err := r.DB.WithContext(ctx).Model(&models.SdUser{}).
		Select("id, email, fullname, status, "+
			"CASE role_id WHEN 1 THEN 'Super Admin' WHEN 2 THEN 'User' ELSE 'Other' END as role_display").
		Where("status = ?", 1).
		Find(&results).Error
	return results, err
}

// CreateUser - สร้างผู้ใช้ใหม่ในระบบ
// CreateUser - Creates a new user in the system
func (r *UserPgRepo) CreateUser(ctx context.Context, user *models.User) error {
	// ใช้ WithContext เพื่อ support context cancellation และ timeout
	// Use WithContext to support context cancellation and timeout
	return r.DB.WithContext(ctx).Create(user).Error
}

// GetUserByID - ค้นหาผู้ใช้ด้วย ID พร้อม preload ความสัมพันธ์
// GetUserByID - Finds user by ID with preloaded relationships
func (r *UserPgRepo) GetUserByID(ctx context.Context, id uint) (*models.User, error) {
	var user models.User

	// Preload ช่วยลด N+1 query problem
	// Preload helps reduce N+1 query problem
	err := r.DB.WithContext(ctx).
		Preload("Roles").   // โหลดข้อมูล roles ที่เกี่ยวข้อง
		Preload("Profile"). // โหลดข้อมูล profile ที่เกี่ยวข้อง
		Where("id = ? AND deleted_at IS NULL", id).
		First(&user).Error

	if err != nil {
		return nil, err
	}
	return &user, nil
}

// UserFilterScopes - สร้าง reusable scopes สําหรับ GORM
// UserFilterScopes - Creates reusable scopes for GORM
type UserFilterScopes struct {
	Name   string
	Email  string
	Status int
	MinAge int
	MaxAge int
}

// ToScopes - แปลง filter struct เป็น GORM scopes
// ToScopes - Converts filter struct to GORM scopes
func (f UserFilterScopes) ToScopes() []func(*gorm.DB) *gorm.DB {
	var scopes []func(*gorm.DB) *gorm.DB

	if f.Name != "" {
		scopes = append(scopes, func(db *gorm.DB) *gorm.DB {
			return db.Where("name ILIKE ?", "%"+f.Name+"%")
		})
	}

	if f.Email != "" {
		scopes = append(scopes, func(db *gorm.DB) *gorm.DB {
			return db.Where("email = ?", f.Email)
		})
	}

	if f.Status > 0 {
		scopes = append(scopes, func(db *gorm.DB) *gorm.DB {
			return db.Where("status = ?", f.Status)
		})
	}

	if f.MinAge > 0 {
		scopes = append(scopes, func(db *gorm.DB) *gorm.DB {
			return db.Where("age >= ?", f.MinAge)
		})
	}

	if f.MaxAge > 0 {
		scopes = append(scopes, func(db *gorm.DB) *gorm.DB {
			return db.Where("age <= ?", f.MaxAge)
		})
	}

	return scopes
}
func (r *UserPgRepo) GetByUsername(ctx context.Context, identifier string) (*models.SdUser, error) {
	var obj *models.SdUser

	// Normalize input: trim spaces and convert to lowercase
	normalized := strings.ToLower(strings.TrimSpace(identifier))

	// Try to find by username first
	if result := r.DB.WithContext(ctx).First(&obj, "username = ?", normalized); result.Error == nil {
		return obj, nil
	}

	// If not found by username, try by email
	if result := r.DB.WithContext(ctx).First(&obj, "email = ?", normalized); result.Error != nil {
		return nil, result.Error
	}
	return obj, nil
}

// ตัวอย่างการใช้งาน scopes
// Example usage of scopes
func (r *UserPgRepo) FindWithScopes(ctx context.Context, filters UserFilterScopes) ([]models.User, error) {
	var users []models.User
	err := r.DB.WithContext(ctx).Scopes(filters.ToScopes()...).Find(&users).Error
	return users, err
}

// GetMultiRaw ดึงรายชื่อผู้ใช้แบบแบ่งหน้าโดยใช้ Raw SQL Query
// เรียงลำดับตามวันที่สร้างล่าสุด (createddate DESC)
func (r *UserPgRepo) GetMultiRaw(ctx context.Context, limit, offset int) ([]*models.SdUser, error) {
	var users []*models.SdUser
	query := `
        SELECT id, createddate, updateddate, deletedate, role_id, email, username,
               firstname, lastname, fullname, nickname, idcard, lastsignindate,
               status, active_status, network_id, remark, infomation_agree_status,
               gender, birthday, online_status, message, network_type_id,
               public_status, type_id, avatarpath, avatar, refresh_token, loginfailed,
               public_notification, sms_notification, email_notification, line_notification,
               mobile_number, phone_number, lineid, system_id, location_id, verified,
               verification_code, password_reset_token, password_reset_at, is_superuser
        FROM sd_user
        ORDER BY createddate DESC
    `
	err := r.DB.WithContext(ctx).Raw(query).Limit(limit).Offset(offset).Scan(&users).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

// GetMultiWithTotal คืนค่ารายชื่อผู้ใช้และจำนวนทั้งหมด (ใช้ GORM แทน raw query)
// GetMultiWithTotal returns users with total count, supports dynamic filters and sorting
func (r *UserPgRepo) GetMultiWithTotal(ctx context.Context, limit, offset int, filters map[string]interface{}) ([]*models.SdUser, int64, error) {
	var users []*models.SdUser
	var total int64

	query := r.DB.WithContext(ctx).Model(&models.SdUser{})

	// Apply filters
	if email, ok := filters["email"].(string); ok && email != "" {
		query = query.Where("email ILIKE ?", "%"+email+"%")
	}
	if username, ok := filters["username"].(string); ok && username != "" {
		query = query.Where("username ILIKE ?", "%"+username+"%")
	}
	if fullname, ok := filters["fullname"].(string); ok && fullname != "" {
		query = query.Where("fullname ILIKE ?", "%"+fullname+"%")
	}
	if status, ok := filters["status"].(int16); ok {
		query = query.Where("status = ?", status)
	}
	if roleID, ok := filters["role_id"].(int); ok && roleID > 0 {
		query = query.Where("role_id = ?", roleID)
	}
	if verified, ok := filters["verified"].(bool); ok {
		query = query.Where("verified = ?", verified)
	}

	// Sorting
	sortBy := "createddate"
	sortOrder := "DESC"
	if sb, ok := filters["sort_by"].(string); ok && sb != "" {
		// Map allowed fields
		switch sb {
		case "email", "username", "fullname", "status", "role_id", "verified", "createddate", "updateddate":
			sortBy = sb
		case "created_at":
			sortBy = "createddate"
		case "updated_at":
			sortBy = "updateddate"
		}
	}
	if so, ok := filters["sort_order"].(string); ok && so == "asc" {
		sortOrder = "ASC"
	}
	query = query.Order(sortBy + " " + sortOrder)

	// Count total before pagination
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Fetch paginated results
	err := query.Limit(limit).Offset(offset).Find(&users).Error
	return users, total, err
}
