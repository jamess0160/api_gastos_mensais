create database gastos_mensais;

use gastos_mensais;

create table registro_gasto(
    id int primary key auto_increment,
    descricao varchar(60),
    preco float,
    tipo int
)