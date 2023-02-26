from django.contrib import admin
from school.models import Estudante, Curso, Matricula

class Estudantes(admin.ModelAdmin):
    list_display = ('id', 'primeiro_nome', 'sobrenome', 'rg', 'cpf','codigo_matricula', 'data_nascimento')
    list_display_links = ('id', 'primeiro_nome', 'sobrenome')
    search_fields = ('primeiro_nome', 'sobrenome', 'codigo_matricula')
    list_per_page = 25


class Cursos(admin.ModelAdmin):
    list_display = ('id', 'codigo_curso', 'nome_curso', 'descricao', 'nivel')
    list_display_links = ('id', 'codigo_curso', 'nome_curso')
    search_fields = ('codigo_curso', 'nome_curso', 'descricao')
    list_per_page = 25

class Matriculas(admin.ModelAdmin):
    list_display = ('id', 'estudante', 'curso', 'periodo', 'data_matricula')
    list_display_links = ('id', 'estudante', 'curso')
    search_fields = ('estudante', 'curso')
    list_per_page = 25    

admin.site.register(Matricula)
admin.site.register(Estudante, Estudantes)
admin.site.register(Curso, Cursos)
