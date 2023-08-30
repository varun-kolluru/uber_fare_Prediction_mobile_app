from django.db import models

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	def create_user(self, email, password, username):
		email = self.normalize_email(email)
		user = self.model(email=email,username=username)
		user.set_password(password)
		user.save()
		return user
	
	def create_superuser(self, email, password, username):
		user = self.create_user(email, password , username)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	email = models.EmailField(max_length=50, primary_key=True)
	username = models.CharField(max_length=50,unique=True)
	register_date = models.DateField(auto_now_add=True)
	fname =  models.CharField(max_length=50)
	lname = models.CharField(max_length=50)
	is_active=models.BooleanField(default=True)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()

	def __str__(self):
		return self.username
	
	@property
	def is_staff(self):
		return self.is_superuser
	



class Data(models.Model):
    distance=models.FloatField(default=0)
    pred_cost=models.FloatField(default=0)
    actual_cost=models.FloatField(default=0)
    time_stamp=models.DateField(auto_now_add=True)
	
    def __str__(self):return self.distance
	    
