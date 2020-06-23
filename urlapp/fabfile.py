from fabric.api import env, cd, sudo, task, run

env.host = ['http://ec2-18-222-233-223.us-east-2.compute.amazonaws.com/']

venv = 'source home/lj/django_projects/django/bin/activate'


def _install_deps():
