-- Favourite Colour
INSERT INTO surveys (name, descrip, open_date, close_date, author) 
    VALUES ('Favourite Colour', 'Let''s find the most popular colour on the internet', null, null, '');

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (1, 'What is your favourite colour?', '', 'radio', '1', true);

INSERT INTO possible_answers (survey_id, question_id, atext, avalue) 
    VALUES  (1, 1, 'Red', 'red'),
            (1, 1, 'Blue', 'blue'),
            (1, 1, 'Green', 'green'),
            (1, 1, 'Purple', 'purple'),
            (1, 1, 'Yellow', 'yellow'),
            (1, 1, 'Orange', 'orange');

-- Music Survey
INSERT INTO surveys (name, descrip, open_date, close_date, author) 
    VALUES ('Music', 'Gauge the music tastes of the internet', 'Fri Nov 01 2019 00:00:00', null, '');

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (2, 'How many hours do you listen to music per day?', '', 'radio', '1', true);

INSERT INTO possible_answers (survey_id, question_id, atext, avalue) 
    VALUES  (2, 2, '0 - 3 hours', '0 - 3'),
            (2, 2, '4 - 7 hours', '4 - 7'),
            (2, 2, '8 - 10 hours', '8 - 10'),
            (2, 2, 'More than 10 hours', '11+');

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (2, 'Who is your favourite musician?', '', 'text', '1', true);

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (2, 'Which genres of music do you like (check all that apply)?', '', 'checkbox', '1', true);

INSERT INTO possible_answers (survey_id, question_id, atext, avalue) 
    VALUES  (2, 4, 'Rock', 'rock'),
            (2, 4, 'Rap/Hip Hop', 'rap'),
            (2, 4, 'Electronic', 'electronic'),
            (2, 4, 'Other', 'other');

-- Movie Survey
INSERT INTO surveys (name, descrip, open_date, close_date, author) 
    VALUES ('The Greatest Movie', '', 'Fri Nov 07 2019 00:00:00', null, '');

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (3, 'What, in your opinion, is the greatest movie?', '', 'text', '1', true);

-- Programming Languages
INSERT INTO surveys (name, descrip, open_date, close_date, author) 
    VALUES ('Programming Languages', '', 'Fri Nov 22 2019 00:00:00', 'Fri Nov 29 2019 00:00:00', '');

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (4, 'What is your main programming language?', '', 'text', '1', true);

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (4, 'What is your favourite programming language?', '', 'text', '1', false);

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (4, 'What is your least favourite programming language?', '', 'text', '1', true);

-- Operating Systems
INSERT INTO surveys (name, descrip, open_date, close_date, author) 
    VALUES ('Operating Systems', '', null, null, '');

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (5, 'Which OS do you like best?', '', 'checkbox', '1', false);

INSERT INTO possible_answers (survey_id, question_id, atext, avalue) 
    VALUES  (5, 9, 'Windows', 'windows'),
            (5, 9, 'MacOS', 'macos'),
            (5, 9, 'Linux', 'linux');

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (5, 'What OS do you use?', '', 'text', '1', true);

-- Desktop Env
INSERT INTO surveys (name, descrip, open_date, close_date, author) 
    VALUES ('Desktop Environments', 'This survey tries to figure out which DE people like vs which DE they use.', null, null, '');

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (6, 'Which DE have you heard of?', '', 'checkbox', '1', true);

INSERT INTO possible_answers (survey_id, question_id, atext, avalue) 
    VALUES  (6, 11, 'Gnome', 'gnome'),
            (6, 11, 'KDE Plasma', 'kde'),
            (6, 11, 'Unity', 'unity');

INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) 
    VALUES (6, 'Which DE do you use?', '', 'checkbox', '1', false);

INSERT INTO possible_answers (survey_id, question_id, atext, avalue) 
    VALUES  (6, 12, 'Gnome', 'gnome'),
            (6, 12, 'KDE Plasma', 'kde'),
            (6, 12, 'Unity', 'unity');
