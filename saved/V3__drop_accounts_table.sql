drop table accounts;

--
-- Read only
--

-- Revoke the default create permission on the public schema from the public role
REVOKE CREATE ON SCHEMA public FROM PUBLIC;

-- Create a group
CREATE ROLE read_only_group;

-- Grant access to existing tables
GRANT USAGE ON SCHEMA public TO read_only_group;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO read_only_group;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO read_only_group;

-- Grant access to future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO read_only_group;

-- Create a final user with password
--CREATE USER '${AR_READ_ONLY_USER}' WITH PASSWORD '${AR_READ_ONLY_PASSWORD}';
--GRANT read_only_group TO '${AR_READ_ONLY_USER}';

-- Clean up scripts incase needed
-- -- DROP OWNED BY read_only_user;
-- -- DROP USER read_only_user;

-- -- DROP OWNED BY read_only_group;
-- -- DROP USER read_only_group;