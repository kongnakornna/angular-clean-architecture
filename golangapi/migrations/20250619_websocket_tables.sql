-- messages history
CREATE TABLE IF NOT EXISTS ws_messages (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic         TEXT NOT NULL,
    payload       JSONB NOT NULL,
    sender_id     TEXT,
    sent_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at  TIMESTAMP WITH TIME ZONE
);

-- user sessions (optional, for authentication)
CREATE TABLE IF NOT EXISTS ws_sessions (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       TEXT NOT NULL,
    token         TEXT NOT NULL UNIQUE,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at    TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_ws_messages_topic ON ws_messages(topic);
CREATE INDEX idx_ws_messages_sent_at ON ws_messages(sent_at DESC);