from django.db import models

class Estudante(models.Model):
    primeiro_nome = models.CharField(max_length=20)
    sobrenome = models.CharField(max_length=50)
    rg = models.CharField(max_length=9)
    cpf = models.CharField(max_length=11)
    codigo_matricula = models.CharField(max_length=12)
    data_nascimento = models.DateField()

    def __str__(self):
        return self.primeiro_nome

class Curso(models.Model):
    NIVEL = (
        ('1', 'Iniciante'),
        ('2', 'Básico'),
        ('3', 'Intermediário'),
        ('4', 'Avançado'),
        ('5', 'Avançado+'),
    )
    codigo_curso = models.CharField(max_length=15)
    nome_curso = models.CharField(max_length=25)
    descricao = models.CharField(max_length=255)
    nivel = models.CharField(max_length=1, choices=NIVEL, blank=False, null=False, default='B')

    def __str__(self):
        return self.nome_curso

class Matricula(models.Model):
    PERIODO = (
        ('M', 'Manhã'),
        ('T', 'Tarde'),
        ('N', 'Noite'),
    )
    estudante = models.ForeignKey(Estudante, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    periodo = models.CharField(max_length=1, choices=PERIODO, blank=False, null=False, default='M')
    data_matricula = models.DateField()

    def __str__(self):
        return self.estudante.primeiro_nome