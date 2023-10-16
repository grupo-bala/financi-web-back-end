truncate table course cascade;
alter sequence course_id_seq restart with 1;

insert into course
(name, description)
values
('Renda fixa de forma descomplicada', 'Curso para iniciantes na área de investimentos de renda fixa');

insert into lesson
(video_url, duration_sec, id_course, name)
values
('https://www.youtube.com/watch?v=18GRtRzOrMM', 10000, 1, 'Guia básico para investir em renda fixa'),
('https://www.youtube.com/watch?v=18GRtRzOrMM', 10000, 1, 'Guia básico para investir em renda fixa'),
('https://www.youtube.com/watch?v=18GRtRzOrMM', 10000, 1, 'Guia básico para investir em renda fixa'),
('https://www.youtube.com/watch?v=18GRtRzOrMM', 10000, 1, 'Guia básico para investir em renda fixa'),
('https://www.youtube.com/watch?v=18GRtRzOrMM', 10000, 1, 'Guia básico para investir em renda fixa'),
('https://www.youtube.com/watch?v=18GRtRzOrMM', 10000, 1, 'Guia básico para investir em renda fixa'),
('https://www.youtube.com/watch?v=18GRtRzOrMM', 10000, 1, 'Guia básico para investir em renda fixa'),
('https://www.youtube.com/watch?v=18GRtRzOrMM', 10000, 1, 'Guia básico para investir em renda fixa');