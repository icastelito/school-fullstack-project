from rest_framework import serializers
from school.models import Estudante, Curso, Matricula

class EstudanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudante
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class MatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matricula
        fields = '__all__'

class ListaMatriculasEstudanteSerializer(serializers.ModelSerializer):
    curso = serializers.ReadOnlyField(source='curso.nome_curso')
    periodo = serializers.SerializerMethodField()

    class Meta:
        model = Matricula
        fields = ['curso', 'periodo']

    def get_periodo(self, obj):
        return obj.get_periodo_display()
    
class ListaEstudantesMatriculadosSerializer(serializers.ModelSerializer):
    estudante = serializers.ReadOnlyField(source='estudante.primeiro_nome')
    codigo_matricula = serializers.ReadOnlyField(source='estudante.codigo_matricula')
    periodo = serializers.SerializerMethodField()

    class Meta:
        model = Matricula
        fields = ['estudante', 'codigo_matricula', 'periodo']

    def get_periodo(self, obj):
        return obj.get_periodo_display()