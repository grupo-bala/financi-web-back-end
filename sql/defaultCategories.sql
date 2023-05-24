truncate table category cascade;
alter sequence category_id_seq restart with 1;

insert into category
(name)
values
('Saúde'),
('Alimentação'),
('Educação'),
('Entretenimento'),
('Vestuário'),
('Cuidados pessoais');