from django.contrib import admin
from django.urls import path, include
from school.views import EstudantesViewSet, CursosViewSet, MatriculasViewSet, ListaMatriculaEstudante, ListaEstudantesMatriculados
from rest_framework import routers

router = routers.DefaultRouter()
router.register('estudantes', EstudantesViewSet, basename='estudantes')
router.register('cursos', CursosViewSet, basename='cursos')
router.register('matriculas', MatriculasViewSet, basename='matriculas')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('estudantes/<int:pk>/matriculas/', ListaMatriculaEstudante.as_view()),
    path('cursos/<int:pk>/matriculas/', ListaEstudantesMatriculados.as_view()),
]
