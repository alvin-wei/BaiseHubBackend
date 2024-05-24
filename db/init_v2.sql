-- 用户表
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
COMMENT ON COLUMN Users.id IS '用户ID，自增主键';
COMMENT ON COLUMN Users.username IS '用户名，必须唯一';
COMMENT ON COLUMN Users.email IS '电子邮件地址，必须唯一';
COMMENT ON COLUMN Users.password_hash IS '密码哈希，用于安全存储密码';
COMMENT ON COLUMN Users.full_name IS '用户全名';
COMMENT ON COLUMN Users.avatar_url IS '用户头像的URL';
COMMENT ON COLUMN Users.registration_date IS '注册时间，默认为当前时间戳';
COMMENT ON COLUMN Users.login_count IS '登录次数，默认为0';
COMMENT ON COLUMN Users.last_login IS '上次登录时间';
COMMENT ON COLUMN Users.phone_number IS '用户注册手机号，必须唯一且非空';


-- 管理员账户表
CREATE TABLE AdminAccounts (
    id SERIAL PRIMARY KEY,                                -- 管理员ID，自增主键
    username VARCHAR(50) UNIQUE NOT NULL,                 -- 管理员用户名，必须唯一
    email VARCHAR(100) UNIQUE NOT NULL,                   -- 管理员电子邮件地址，必须唯一
    password_hash VARCHAR(255) NOT NULL,                  -- 管理员密码哈希，用于安全存储密码
    full_name VARCHAR(100),                               -- 管理员全名
    role VARCHAR(20) NOT NULL CHECK (role IN ('superadmin', 'admin', 'editor', 'viewer')),  -- 管理员角色
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       -- 账户创建时间，默认为当前时间戳
    last_login TIMESTAMP                                  -- 管理员上次登录时间
);

-- 索引可以加速用户名和电子邮件的查询效率，特别是在进行登录验证时
CREATE INDEX idx_admin_username ON AdminAccounts (username);
CREATE INDEX idx_admin_email ON AdminAccounts (email);

COMMENT ON TABLE AdminAccounts IS '管理员账户表';
COMMENT ON COLUMN AdminAccounts.id IS '管理员ID，自增主键';
COMMENT ON COLUMN AdminAccounts.username IS '管理员用户名，必须唯一';
COMMENT ON COLUMN AdminAccounts.email IS '管理员电子邮件地址，必须唯一';
COMMENT ON COLUMN AdminAccounts.password_hash IS '管理员密码哈希，用于安全存储密码';
COMMENT ON COLUMN AdminAccounts.full_name IS '管理员全名';
COMMENT ON COLUMN AdminAccounts.role IS '管理员角色，包括 "superadmin", "admin", "editor", "viewer"';
COMMENT ON COLUMN AdminAccounts.created_at IS '账户创建时间，默认为当前时间戳';
COMMENT ON COLUMN AdminAccounts.last_login IS '管理员上次登录时间';
COMMENT ON INDEX idx_admin_username IS '加速管理员用户名查询效率';
COMMENT ON INDEX idx_admin_email IS '加速管理员电子邮件查询效率';



-- 产品表
CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    minimum_fans INT DEFAULT 0,  -- 购买产品所需的最低粉丝数量
    visibility VARCHAR(20) NOT NULL CHECK (visibility IN ('public', 'private', 'followers_only', 'pay_per_view'))
);

-- 添加表和字段的备注
COMMENT ON TABLE Products IS '存储可供购买的产品信息，包括名称、价格、描述及可见性等';
COMMENT ON COLUMN Products.id IS '产品的唯一标识符';
COMMENT ON COLUMN Products.name IS '产品名称';
COMMENT ON COLUMN Products.price IS '产品价格，单位通常为本地货币';
COMMENT ON COLUMN Products.description IS '产品的详细描述';
COMMENT ON COLUMN Products.minimum_fans IS '购买该产品需要的最低粉丝数量，用于特定促销或限定产品';
COMMENT ON COLUMN Products.visibility IS '产品的可见性，定义谁可以看到或购买此产品，可选值包括公开、私有、仅粉丝可见或按观看付费';



-- 视频表
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
    review_status VARCHAR(20) NOT NULL CHECK (review_status IN ('pending', 'approved', 'rejected')),  -- 添加审核状态
    reviewer_id INT,  -- 可以为空，表示还未分配审批员
    FOREIGN KEY (uploader_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES AdminAccounts(id)  -- 确保审批员是管理员
);


COMMENT ON TABLE Videos IS '视频表';
COMMENT ON COLUMN Videos.id IS '视频ID，自增主键';
COMMENT ON COLUMN Videos.title IS '视频标题，非空';
COMMENT ON COLUMN Videos.description IS '视频描述';
COMMENT ON COLUMN Videos.uploader_id IS '上传者用户ID，非空';
COMMENT ON COLUMN Videos.upload_date IS '视频上传日期，默认为当前时间戳';
COMMENT ON COLUMN Videos.video_url IS '视频URL，非空';
COMMENT ON COLUMN Videos.video_length IS '视频长度，非空';
COMMENT ON COLUMN Videos.clarity IS '视频清晰度，非空';
COMMENT ON COLUMN Videos.download IS '下载次数，默认为0';
COMMENT ON COLUMN Videos.review_status IS '审核状态，包括 "pending", "approved", "rejected"，默认为 "pending"';
COMMENT ON COLUMN Videos.reviewer_id IS '审批员ID，可以为空，表示还未分配审批员';
COMMENT ON COLUMN Videos.uploader_id IS '视频上传者外键约束，关联用户表的用户ID';
COMMENT ON COLUMN Videos.reviewer_id IS '视频审批员外键约束，关联管理员账户表的管理员ID';


-- 标签表
CREATE TABLE Tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

COMMENT ON TABLE Tags IS '标签表';
COMMENT ON COLUMN Tags.id IS '标签ID，自增主键';
COMMENT ON COLUMN Tags.name IS '标签名称，必须唯一且非空';



-- 用户余额表
CREATE TABLE UserBalances (
    user_id INT PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,  -- 余额，设定两位小数

    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

COMMENT ON TABLE UserBalances IS '用户余额表';
COMMENT ON COLUMN UserBalances.user_id IS '用户ID，作为主键';
COMMENT ON COLUMN UserBalances.balance IS '余额，设定为十进制数，精确到小数点后两位';
COMMENT ON COLUMN UserBalances.user_id IS '用户ID外键约束，关联用户表的用户ID，级联删除';



-- 推荐视频排名表
CREATE TABLE VideosTop (
    id SERIAL PRIMARY KEY,              -- 主键，自增
    video_id INT NOT NULL,              -- 视频ID，对应Videos表的id
    rank INT NOT NULL DEFAULT 9999,     -- 视频的推荐排名，如果未指定则默认为9999

    CONSTRAINT fk_video_id
        FOREIGN KEY(video_id) 
        REFERENCES Videos(id)           -- 外键约束，确保video_id对应Videos表中的一个有效id
);

COMMENT ON TABLE VideosTop IS '推荐视频排名表';
COMMENT ON COLUMN VideosTop.id IS '记录ID，自增主键';
COMMENT ON COLUMN VideosTop.video_id IS '视频ID，对应Videos表的id';
COMMENT ON COLUMN VideosTop.rank IS '视频的推荐排名，如果未指定则默认为9999';
COMMENT ON CONSTRAINT fk_video_id ON VideosTop IS '视频ID外键约束，确保video_id对应Videos表中的一个有效id';



-- 网页浏览数据表
CREATE TABLE PageViews (
    id SERIAL PRIMARY KEY,              -- 记录ID，自增主键
    page_ids VARCHAR(50) NOT NULL,      -- 页面ID
    visitor_id INT,                     -- 访问者ID，如果需要跟踪单个访问者
    view_time TIMESTAMP NOT NULL        -- 访问时间戳
);

-- 为PageViews表中的page_ids和view_time列创建索引，以加快查询速度
CREATE INDEX idx_page_ids ON PageViews (page_ids);
CREATE INDEX idx_view_time ON PageViews (view_time);

COMMENT ON TABLE PageViews IS '网页浏览数据表';
COMMENT ON COLUMN PageViews.id IS '记录ID，自增主键';
COMMENT ON COLUMN PageViews.page_ids IS '页面ID';
COMMENT ON COLUMN PageViews.visitor_id IS '访问者ID，如果需要跟踪单个访问者';
COMMENT ON COLUMN PageViews.view_time IS '访问时间戳';
COMMENT ON INDEX idx_page_ids IS '为page_ids列创建的索引，用于加快查询速度';
COMMENT ON INDEX idx_view_time IS '为view_time列创建的索引，用于加快查询速度';



-- 视频标签关联表
CREATE TABLE VideoTags (
    video_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (video_id, tag_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(id) ON DELETE CASCADE
);

COMMENT ON TABLE VideoTags IS '视频标签关联表';
COMMENT ON COLUMN VideoTags.video_id IS '视频ID，非空';
COMMENT ON COLUMN VideoTags.tag_id IS '标签ID，非空';
COMMENT ON CONSTRAINT VideoTags_pkey ON VideoTags IS '视频ID和标签ID的复合主键';
COMMENT ON COLUMN VideoTags.video_id IS '视频ID外键约束，关联Videos表的视频ID，级联删除';
COMMENT ON COLUMN VideoTags.tag_id IS '标签ID外键约束，关联Tags表的标签ID，级联删除';


-- 评论表
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

COMMENT ON TABLE Comments IS '评论表';
COMMENT ON COLUMN Comments.id IS '评论ID，自增主键';
COMMENT ON COLUMN Comments.video_id IS '视频ID，非空';
COMMENT ON COLUMN Comments.user_id IS '用户ID，非空';
COMMENT ON COLUMN Comments.parent_comment_id IS '父评论ID，可以为空，表示根评论';
COMMENT ON COLUMN Comments.content IS '评论内容，非空';
COMMENT ON COLUMN Comments.comment_date IS '评论时间，默认为当前时间戳';
COMMENT ON COLUMN Comments.video_id IS '视频ID外键约束，关联Videos表的视频ID，级联删除';
COMMENT ON COLUMN Comments.user_id IS '用户ID外键约束，关联Users表的用户ID，级联删除';
COMMENT ON COLUMN Comments.parent_comment_id IS '父评论ID外键约束，关联自身表的评论ID，级联删除';



-- 粉丝表
CREATE TABLE Followers (
    blogger_id INT NOT NULL,
    follower_id INT NOT NULL,
    follow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blogger_id, follower_id),
    FOREIGN KEY (blogger_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (follower_id) REFERENCES Users(id) ON DELETE CASCADE
);

COMMENT ON TABLE Followers IS '粉丝表';
COMMENT ON COLUMN Followers.blogger_id IS '博主用户ID，非空';
COMMENT ON COLUMN Followers.follower_id IS '粉丝用户ID，非空';
COMMENT ON COLUMN Followers.follow_date IS '关注日期，默认为当前时间戳';
COMMENT ON CONSTRAINT Followers_pkey ON Followers IS '博主用户ID和粉丝用户ID的复合主键';
COMMENT ON COLUMN Followers.blogger_id IS '博主用户ID外键约束，关联Users表的用户ID，级联删除';
COMMENT ON COLUMN Followers.follower_id IS '粉丝用户ID外键约束，关联Users表的用户ID，级联删除';



-- 视频观看记录表
CREATE TABLE VideoViews (
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    view_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (video_id, user_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

COMMENT ON TABLE VideoViews IS '视频观看记录表';
COMMENT ON COLUMN VideoViews.video_id IS '视频ID，非空';
COMMENT ON COLUMN VideoViews.user_id IS '用户ID，非空';
COMMENT ON COLUMN VideoViews.view_date IS '观看日期，默认为当前时间戳';
COMMENT ON CONSTRAINT VideoViews_pkey ON VideoViews IS '视频ID和用户ID的复合主键';
COMMENT ON COLUMN VideoViews.video_id IS '视频ID外键约束，关联Videos表的视频ID，级联删除';
COMMENT ON COLUMN VideoViews.user_id IS '用户ID外键约束，关联Users表的用户ID，级联删除';

-- 视频点赞记录表
CREATE TABLE VideoLikes (
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    like_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (video_id, user_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

COMMENT ON TABLE VideoLikes IS '视频点赞记录表';
COMMENT ON COLUMN VideoLikes.video_id IS '视频ID，非空';
COMMENT ON COLUMN VideoLikes.user_id IS '用户ID，非空';
COMMENT ON COLUMN VideoLikes.like_date IS '点赞日期，默认为当前时间戳';
COMMENT ON CONSTRAINT VideoLikes_pkey ON VideoLikes IS '视频ID和用户ID的复合主键';
COMMENT ON COLUMN VideoLikes.video_id IS '视频ID外键约束，关联Videos表的视频ID，级联删除';
COMMENT ON COLUMN VideoLikes.user_id IS '用户ID外键约束，关联Users表的用户ID，级联删除';



-- 视频收藏记录表
CREATE TABLE VideoFavorites (
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    favorite_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (video_id, user_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

COMMENT ON TABLE VideoFavorites IS '视频收藏记录表';
COMMENT ON COLUMN VideoFavorites.video_id IS '视频ID，非空';
COMMENT ON COLUMN VideoFavorites.user_id IS '用户ID，非空';
COMMENT ON COLUMN VideoFavorites.favorite_date IS '收藏日期，默认为当前时间戳';
COMMENT ON CONSTRAINT VideoFavorites_pkey ON VideoFavorites IS '视频ID和用户ID的复合主键';
COMMENT ON COLUMN VideoFavorites.video_id IS '视频ID外键约束，关联Videos表的视频ID，级联删除';
COMMENT ON COLUMN VideoFavorites.user_id IS '用户ID外键约束，关联Users表的用户ID，级联删除';



-- 支付记录表
CREATE TABLE PaymentRecords (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,  -- 充值金额
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

COMMENT ON TABLE PaymentRecords IS '支付记录表';
COMMENT ON COLUMN PaymentRecords.id IS '支付记录ID，自增主键';
COMMENT ON COLUMN PaymentRecords.user_id IS '用户ID，非空';
COMMENT ON COLUMN PaymentRecords.amount IS '充值金额，设定为十进制数，精确到小数点后两位';
COMMENT ON COLUMN PaymentRecords.payment_date IS '支付日期，默认为当前时间戳';
COMMENT ON COLUMN PaymentRecords.user_id IS '用户ID外键约束，关联Users表的用户ID，级联删除';



-- 用户购买记录表
CREATE TABLE UserPurchases (
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);


COMMENT ON TABLE UserPurchases IS '用户购买记录表';
COMMENT ON COLUMN UserPurchases.user_id IS '用户ID，非空';
COMMENT ON COLUMN UserPurchases.product_id IS '产品ID，非空';
COMMENT ON COLUMN UserPurchases.purchase_date IS '购买日期，默认为当前时间戳';
COMMENT ON CONSTRAINT UserPurchases_pkey ON UserPurchases IS '用户ID和产品ID的复合主键';
COMMENT ON COLUMN UserPurchases.user_id IS '用户ID外键约束，关联Users表的用户ID，级联删除';
COMMENT ON COLUMN UserPurchases.product_id IS '产品ID外键约束，关联Products表的产品ID，级联删除';


-- 视频访问控制表
CREATE TABLE VideoAccess (
    video_id INT NOT NULL,
    access_type VARCHAR(20) NOT NULL CHECK (access_type IN ('public', 'private', 'followers_only', 'pay_per_view')),

    PRIMARY KEY (video_id),
    FOREIGN KEY (video_id) REFERENCES Videos(id) ON DELETE CASCADE
);


COMMENT ON TABLE VideoAccess IS '视频访问控制表';
COMMENT ON COLUMN VideoAccess.video_id IS '视频ID，非空';
COMMENT ON COLUMN VideoAccess.access_type IS '访问类型，包括 "public", "private", "followers_only", "pay_per_view"';
COMMENT ON CONSTRAINT VideoAccess_pkey ON VideoAccess IS '视频ID的主键约束';
COMMENT ON COLUMN VideoAccess.video_id IS '视频ID外键约束，关联Videos表的视频ID，级联删除';


-- 审计日志表
CREATE TABLE AdminActivityLog (
    id SERIAL PRIMARY KEY,                        -- 日志ID，自增主键
    admin_id INT NOT NULL,                        -- 执行操作的管理员ID
    action VARCHAR(255) NOT NULL,                 -- 描述管理员执行的具体操作
    role VARCHAR(50) NOT NULL,                    -- 执行操作时管理员的角色
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 操作执行的时间，默认为当前时间戳

    FOREIGN KEY (admin_id) REFERENCES AdminAccounts(id) ON DELETE CASCADE
);

COMMENT ON TABLE AdminActivityLog IS '审计日志表';
COMMENT ON COLUMN AdminActivityLog.id IS '日志ID，自增主键';
COMMENT ON COLUMN AdminActivityLog.admin_id IS '执行操作的管理员ID，非空';
COMMENT ON COLUMN AdminActivityLog.action IS '描述管理员执行的具体操作，非空';
COMMENT ON COLUMN AdminActivityLog.role IS '执行操作时管理员的角色，非空';
COMMENT ON COLUMN AdminActivityLog.action_time IS '操作执行的时间，默认为当前时间戳';
COMMENT ON COLUMN AdminActivityLog.admin_id IS '管理员ID外键约束，关联AdminAccounts表的管理员ID，级联删除';
CREATE INDEX idx_admin_action_time ON AdminActivityLog (action_time);
CREATE INDEX idx_admin_id ON AdminActivityLog (admin_id);

