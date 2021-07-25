CREATE TABLE featured_notes (
  id int(11) NOT NULL,
  user_note_id int(11) NOT NULL,
  title varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  content text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  state tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE featured_tags (
  id int(11) NOT NULL,
  name varchar(63) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  so int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE featured_tag_note_assoc (
  tag_id int(11) NOT NULL,
  note_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE users (
  id int(11) UNSIGNED NOT NULL,
  name varchar(20) DEFAULT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  admin tinyint(4) UNSIGNED NOT NULL,
  avatar varchar(255) NOT NULL,
  desc text NOT NULL,
  activation varchar(255) NOT NULL,
  blocked tinyint(4) UNSIGNED NOT NULL,
  registered datetime NOT NULL,
  last_login datetime NOT NULL,
  last_reset datetime NOT NULL,
  reset_token varchar(255) NOT NULL,
  params text NOT NULL,
  advanced_due_date date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE user_notes (
  id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  title varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  content text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  last_viewed_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  pinned tinyint(1) NOT NULL DEFAULT 0,
  options int(11) NOT NULL DEFAULT 0,
  share_id varchar(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_tags (
  id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  name varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  last_viewed_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_tag_note_assoc (
  tag_id int(11) NOT NULL,
  note_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_words (
  id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  word varchar(100) CHARACTER SET ascii NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  last_viewed_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  pinned tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;