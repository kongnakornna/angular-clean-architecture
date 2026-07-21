package middleware

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"icmongolang/internal/models"
	"icmongolang/pkg/httpErrors"
	"icmongolang/pkg/jwt"
	"icmongolang/pkg/responses"

	"github.com/go-chi/render"
	"github.com/google/uuid"
)

var (
	TokenCtxKey = &contextKey{"Token"}
	IdCtxKey    = &contextKey{"Id"}
	EmailCtxKey = &contextKey{"Email"}
	ErrorCtxKey = &contextKey{"Error"}
	UserCtxKey  = &contextKey{"User"}
)

type contextKey struct {
	name string
}

func (k *contextKey) String() string {
	return "jwtauth context value " + k.name
}

func (mw *MiddlewareManager) Verifier(requireAccessToken bool) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			token := TokenFromHeader(r)
			if token == "" {
				err := httpErrors.ErrTokenNotFound(errors.New("not found token in header"))
				ctx = context.WithValue(ctx, ErrorCtxKey, err)
			} else {
				var publicKey string
				if requireAccessToken {
					publicKey = mw.cfg.Jwt.AccessTokenPublicKey
				} else {
					publicKey = mw.cfg.Jwt.RefreshTokenPublicKey
				}
				id, email, err := jwt.ParseTokenRS256(token, publicKey)
				ctx = context.WithValue(ctx, TokenCtxKey, token)
				ctx = context.WithValue(ctx, IdCtxKey, id)
				ctx = context.WithValue(ctx, EmailCtxKey, email)
				ctx = context.WithValue(ctx, ErrorCtxKey, err)
			}
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func (mw *MiddlewareManager) Authenticator() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			err, _ := r.Context().Value(ErrorCtxKey).(error)
			if err != nil {
				render.Render(w, r, responses.CreateErrorResponse(err))
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

func (mw *MiddlewareManager) CurrentUser() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			id, _ := ctx.Value(IdCtxKey).(string)
			err, _ := ctx.Value(ErrorCtxKey).(error)

			if err != nil || id == "" {
				render.Render(w, r, responses.CreateErrorResponse(httpErrors.ParseErrors(err)))
				return
			}

			idParsed, err := uuid.Parse(id)
			if err != nil {
				render.Render(w, r, responses.CreateErrorResponse(httpErrors.ErrInvalidJWTClaims(errors.New("can not convert id to uuid from id in token"))))
				return
			}

			user, err := mw.usersUC.Get(ctx, idParsed)
			if err != nil {
				render.Render(w, r, responses.CreateErrorResponse(err))
				return
			}

			ctx = context.WithValue(ctx, UserCtxKey, user)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func (mw *MiddlewareManager) SuperUser() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			user, err := GetUserFromCtx(ctx)
			if err != nil {
				render.Render(w, r, responses.CreateErrorResponse(err))
				return
			}
			if !mw.usersUC.IsSuper(ctx, *user) {
				render.Render(w, r, responses.CreateErrorResponse(httpErrors.ErrNotEnoughPrivileges(errors.New("user is not super user"))))
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

func (mw *MiddlewareManager) ActiveUser() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			user, err := GetUserFromCtx(ctx)
			if err != nil {
				render.Render(w, r, responses.CreateErrorResponse(err))
				return
			}
			if !mw.usersUC.IsActive(ctx, *user) {
				render.Render(w, r, responses.CreateErrorResponse(httpErrors.ErrInactiveUser(errors.New("user inactive"))))
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

func TokenFromHeader(r *http.Request) string {
	bearer := r.Header.Get("Authorization")
	if len(bearer) > 7 && strings.ToUpper(bearer[0:6]) == "BEARER" {
		return bearer[7:]
	}
	return ""
}

func GetUserFromCtx(ctx context.Context) (*models.SdUser, error) {
	user, ok := ctx.Value(UserCtxKey).(*models.SdUser)
	if !ok {
		return nil, httpErrors.ErrUnauthorized(errors.New("cannot convert user from context"))
	}
	return user, nil
}
