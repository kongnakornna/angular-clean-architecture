package presenter

import "time"

type CreateTemplateRequest struct {
	Name string `json:"name" validate:"required"`
}

type UpdateTemplateRequest struct {
	Name   string `json:"name,omitempty"`
	Status *int   `json:"status,omitempty"`
}

type TemplateResponse struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Status    int       `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
