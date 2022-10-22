# Cadastro de carro

**RF**=> Requisitos funcionais
Deve ser possivel cadastar um novo carro

**RN**=> Regra de negocio
Não deve ser possivel cadastrar um carro com placa ja existente
O carro deve ser cadastrado por padrão, por padão, com disponibilidade
O usuario responsavel pelo cadastro deve ser um usuario administrador

# Listagem de carro

**RF**=> Requisitos funcionais
Deve ser possivel listar todos os carro disponiveis
Deve ser possivel listar todos os carro disponiveis pelo nome da categoria
Deve ser possivel listar todos os carro disponiveis pelo nome da marca
Deve ser possivel listar todos os carro disponiveis pelo nome do carro

**RN**=> Regra de negocio
O usuario não precisa estar logado no sistema

# Cadastro de especificação no carro

**RF**=> Requisitos funcionais
Deve ser possivel cadastrar uma especificação para um carro

**RN**=> Regra de negocio
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
Não deve ser possivel cadastrar uma especificação existente para o mesmo carro
O usuario responsavel pelo cadastro deve ser um usuario administrador

# Cadastro de imagem do carro

**RF**=> Requisitos funcionais
Deve ser possivel cadastrar a imagem do carro
Deve ser possivel listar todos os carros

**RNF**
Ultilizar o multer para upload dos arquivos

**RN**=> Regra de negocio
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
o usuario responsavel pelo cadastro deve ser um usuario administrador

# Aluguel do carro

**Rf**=> Requisitos funcionais
Deve ser possivel cadastrar um aluguel

**RN**=> Regra de negocio
O aluguel deve ter duração minima de 24 horas
Não deve ser possivel cadastrar um aluguel caso ja exista um aberto para o mesmo usuario
Não deve ser possivel cadastrar um aluguel caso ja exista um aberto para o mesmo carro