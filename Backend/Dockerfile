# Imagem base
FROM python:3

# Diretório de trabalho
WORKDIR /app

# Copiando o arquivo de requisitos
COPY requirements.txt .

# Instalando as dependências
RUN pip install -r requirements.txt

# Copiando o código da aplicação
COPY . .

# Expondo a porta 8000
EXPOSE 8000

# Comando para rodar a aplicação
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
