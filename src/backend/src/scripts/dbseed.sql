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
            (2, 2, '4 - 7 hours', '3 - 6'),
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
