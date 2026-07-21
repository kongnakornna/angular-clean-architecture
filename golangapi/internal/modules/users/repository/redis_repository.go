package repository

import (
	"icmongolang/internal/models"
	"icmongolang/internal/repository"
	"icmongolang/internal/modules/users"

	"github.com/redis/go-redis/v9"
)

type UserRedisRepo struct {
	repository.RedisRepo[models.SdUser]
}

func CreateUserRedisRepository(redisClient *redis.Client) users.UserRedisRepository {
	return &UserRedisRepo{
		RedisRepo: repository.CreateRedisRepo[models.SdUser](redisClient),
	}
}
