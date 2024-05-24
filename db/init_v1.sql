CREATE TABLE Users (
    id SERIAL PRIMARY KEY,                                -- 用户ID，自增主键
    username VARCHAR(50) UNIQUE NOT NULL,                 -- 用户名，必须唯一
    email VARCHAR(100) UNIQUE NOT NULL,                   -- 电子邮件地址，必须唯一
    password_hash VARCHAR(255) NOT NULL,                  -- 密码哈希，用于安全存储密码
    full_name VARCHAR(100),                               -- 用户全名
    avatar_url VARCHAR(255),                              -- 用户头像的URL
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- 注册时间，默认为当前时间戳
    login_count INT DEFAULT 0,                            -- 登录次数，默认为0
    last_login TIMESTAMP,                                 -- 上次登录时间
    phone_number VARCHAR(20) UNIQUE NOT NULL              -- 用户注册手机号，必须唯一且非空
);

-- Videos table, remove direct counts from the table as they will be derived from interaction tables
CREATE TABLE Videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    uploader_id INT NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    video_url VARCHAR(255) NOT NULL,
    video_length VARCHAR(255) NOT NULL,
    clarity VARCHAR(255) NOT NULL,
    download INT NOT NULL DEFAULT 0,
    FOREIGN KEY (uploader_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 创建一个记录推荐视频和其排名的表
CREATE TABLE VideosTop (
    id SERIAL PRIMARY KEY,              -- 主键，自增
    video_id INT NOT NULL,              -- 视频ID，对应Videos表的id
    rank INT NOT NULL DEFAULT 9999,     -- 视频的推荐排名，如果未指定则默认为9999

    CONSTRAINT fk_video_id
        FOREIGN KEY(video_id) 
        REFERENCES Videos(id)           -- 外键约束，确保video_id对应Videos表中的一个有效id
);

-- 创建一个记录网页浏览数据的表
CREATE TABLE PageViews (
    id SERIAL PRIMARY KEY,              -- 记录ID，自增主键
    page_id INT NOT NULL,               -- 页面ID，根据实际情况可以设置为外键
    visitor_id INT,                     -- 访问者ID，如果需要跟踪单个访问者
    view_time TIMESTAMP NOT NULL,       -- 访问时间戳

    CONSTRAINT fk_page_id
        FOREIGN KEY(page_id) 
        REFERENCES Pages(id)            -- 如果有Pages表，可以添加外键约束
);

-- 为PageViews表中的page_id和view_time列创建索引，以加快查询速度
CREATE INDEX idx_page_id ON PageViews (page_id);
CREATE INDEX idx_view_time ON PageViews (view_time);


-- Comments table remains the same
CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    parent_comment_id INT,
    content TEXT NOT NULL,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES Comments(id) ON DELETE CASCADE
);

-- Tags and VideoTags tables remain the same
CREATE TABLE Tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE VideoTags (
    video_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (video_id, tag_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(id) ON DELETE CASCADE
);

-- New table for tracking Followers
CREATE TABLE Followers (
    blogger_id INT NOT NULL,
    follower_id INT NOT NULL,
    follow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blogger_id, follower_id),
    FOREIGN KEY (blogger_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (follower_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- New tables for detailed tracking of video views, likes, and favorites
CREATE TABLE VideoViews (
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    view_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (video_id, user_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE VideoLikes (
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    like_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (video_id, user_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE VideoFavorites (
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    favorite_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (video_id, user_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE UserBalances (
    user_id INT PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,  -- 余额，设定两位小数

    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE PaymentRecords (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,  -- 充值金额
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);


CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    minimum_fans INT DEFAULT 0,  -- 购买产品所需的最低粉丝数量
    visibility ENUM('public', 'private', 'followers_only', 'pay_per_view') NOT NULL
);


CREATE TABLE UserPurchases (
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);


CREATE TABLE VideoAccess (
    video_id INT NOT NULL,
    access_type ENUM('public', 'private', 'followers_only', 'pay_per_view') NOT NULL,

    PRIMARY KEY (video_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE
);


CREATE TABLE AdminAccounts (
    id SERIAL PRIMARY KEY,                                -- 管理员ID，自增主键
    username VARCHAR(50) UNIQUE NOT NULL,                 -- 管理员用户名，必须唯一
    email VARCHAR(100) UNIQUE NOT NULL,                   -- 管理员电子邮件地址，必须唯一
    password_hash VARCHAR(255) NOT NULL,                  -- 管理员密码哈希，用于安全存储密码
    full_name VARCHAR(100),                               -- 管理员全名
    role ENUM('superadmin', 'admin', 'editor', 'viewer') NOT NULL,  -- 管理员角色
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       -- 账户创建时间，默认为当前时间戳
    last_login TIMESTAMP                                  -- 管理员上次登录时间
);

-- 索引可以加速用户名和电子邮件的查询效率，特别是在进行登录验证时
CREATE INDEX idx_admin_username ON AdminAccounts (username);
CREATE INDEX idx_admin_email ON AdminAccounts (email);


-- 审计日志表
CREATE TABLE AdminActivityLog (
    id SERIAL PRIMARY KEY,                        -- 日志ID，自增主键
    admin_id INT NOT NULL,                        -- 执行操作的管理员ID
    action VARCHAR(255) NOT NULL,                 -- 描述管理员执行的具体操作
    role VARCHAR(50) NOT NULL,                    -- 执行操作时管理员的角色
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 操作执行的时间，默认为当前时间戳

    FOREIGN KEY (admin_id) REFERENCES AdminAccounts(id) ON DELETE CASCADE
);

-- 索引可以加速查询效率，特别是在查找特定管理员或时间范围的操作时
CREATE INDEX idx_admin_action_time ON AdminActivityLog (action_time);
CREATE INDEX idx_admin_id ON AdminActivityLog (admin_id);

