UPDATE status SET status_color = 'white' WHERE COALESCE(status_color,'') = '';
ALTER TABLE status ALTER COLUMN status_color SET default 'white';