-- 기존 테이블 삭제 (있는 경우)
DROP TABLE IF EXISTS app_fcm_topic CASCADE;
DROP TABLE IF EXISTS app_style CASCADE;
DROP TABLE IF EXISTS app_toolbar CASCADE;
DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS app CASCADE;

-- 1. 기본 app 테이블 생성 (다른 테이블의 부모 테이블)
CREATE TABLE IF NOT EXISTS app (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. menu 테이블 생성 (독립적인 테이블)
CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. app 관련 하위 테이블들 생성
CREATE TABLE IF NOT EXISTS app_toolbar (
    id SERIAL PRIMARY KEY,
    app_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    icon TEXT,
    action_type VARCHAR(50),
    action_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (app_id) REFERENCES app(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS app_style (
    id SERIAL PRIMARY KEY,
    app_id INTEGER NOT NULL,
    theme_color VARCHAR(7),
    font_family VARCHAR(100),
    font_size INTEGER,
    background_color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (app_id) REFERENCES app(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS app_fcm_topic (
    id SERIAL PRIMARY KEY,
    app_id INTEGER NOT NULL,
    topic_name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    subscriber_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (app_id) REFERENCES app(id) ON DELETE CASCADE
);

-- 샘플 데이터 추가
INSERT INTO app (name, description) VALUES
('App 1', 'Description for App 1'),
('App 2', 'Description for App 2');

INSERT INTO menu (name, description) VALUES
('Menu 1', 'Description for Menu 1'),
('Menu 2', 'Description for Menu 2');

-- app_toolbar 샘플 데이터
INSERT INTO app_toolbar (app_id, name, icon, action_type, action_value) VALUES
(1, 'Home', 'home', 'navigation', '/home'),
(1, 'Settings', 'settings', 'navigation', '/settings');

-- app_style 샘플 데이터
INSERT INTO app_style (app_id, theme_color, font_family, font_size, background_color) VALUES
(1, '#007BFF', 'Arial', 16, '#FFFFFF'),
(2, '#28A745', 'Roboto', 14, '#F8F9FA');

-- app_fcm_topic 샘플 데이터
INSERT INTO app_fcm_topic (app_id, topic_name, description) VALUES
(1, 'news', 'News notifications'),
(1, 'updates', 'Update notifications');

-- 나머지 테이블들의 데이터도 추가...

-- 다른 필요한 테이블들도 추가... 