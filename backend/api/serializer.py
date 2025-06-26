from api.models import User
from api.models import Agency
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        profile = user.profile
        token['full_name'] = profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = profile.bio
        token['image'] = str(profile.image)
        token['verified'] = profile.verified
        token['role'] = profile.role
        token['agency'] = profile.agency.name if profile.agency else None
        return token



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    role = serializers.ChoiceField(choices=[("student", "Student"), ("mentor", "Mentor")])
    agency_code = serializers.CharField(write_only=True, required=False, allow_blank=True)
    full_name = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2', 'role', 'agency_code', 'full_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        agency_code = validated_data.pop('agency_code', None)
        role = validated_data.pop('role', 'student')
        full_name = validated_data.pop('full_name', '')

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        profile = user.profile
        profile.role = role
        profile.full_name = full_name

        if agency_code:
            try:
                agency = Agency.objects.get(code=agency_code)
                profile.agency = agency
            except Agency.DoesNotExist:
                pass  # можно вернуть ошибку при желании

        profile.save()
        return user

class AgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Agency
        fields = ['id', 'name', 'code', 'created_at']
        read_only_fields = ['code', 'created_at']
