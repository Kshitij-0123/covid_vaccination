from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import VaccinationCenter, User, VaccinationSlot
from .serializers import VaccinationCenterSerializer, VaccinationSlotSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate

@csrf_exempt
@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        try:
            user = User.objects.get(username=username, password=password)
            data = {'message': 'Login successful.', 'user_id': user.id}
            return Response(data)
        except User.DoesNotExist:
            data = {'error': 'Invalid credentials.'}
            return Response(data, status=400)
        # if user is not None:
        #     login(request, user)
        #     data = {'message': 'Login successful.', 'user_id': user.id}
        #     return Response(data)
        # else:
        #     data = {'error': 'Invalid credentials.'}
        #     return Response(data, status=400)

@api_view(['POST'])
def user_signup(request):
    if request.method == 'POST':
        name = request.data.get('name')
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            if User.objects.filter(username=username).exists():
                data = {'error': 'Username already exists.'}
                return Response(data, status=400)

            user = User.objects.create_user(username=username, password=password)
            user.name = name
            user.save()

            data = {'message': 'Account created successfully. Please log in.'}
            return Response(data)
        except:
            data = {'error': 'Something went wrong. Please try again later.'}
            return Response(data, status=500)

@api_view(['POST'])
def search_centers(request):
    if request.method == 'POST':
        search_query = request.data.get('search_query')
        centers = VaccinationCenter.objects.filter(name__icontains=search_query)
        serializer = VaccinationCenterSerializer(centers, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def get_vaccination_centers(request):
    centers = VaccinationCenter.objects.all()
    serializer = VaccinationCenterSerializer(centers, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def apply_slot(request):
    if request.method == 'POST':
        center_id = request.data.get('center_id')
        date = request.data.get('date')
        user_id = request.data.get('user_id')
        print(user_id)

        try:
            center = VaccinationCenter.objects.get(pk=center_id)
            user = User.objects.get(pk=user_id)
            slot, created = VaccinationSlot.objects.get_or_create(center=center, date=date, user=user)
            # slot, created = VaccinationSlot.objects.get_or_create(center=center, date=date)
            if slot.available_slots > 0:
                slot.available_slots -= 1
                slot.save()
                data = {'message': 'Slot booked successfully.'}
                return Response(data)
            else:
                data = {'error': 'No available slots for this date.'}
                return Response(data, status=400)
        except (VaccinationCenter.DoesNotExist, VaccinationSlot.DoesNotExist):
            data = {'error': 'Invalid center or date.'}
            return Response(data, status=400)

@api_view(['POST'])
def user_logout(request):
    if 'user_id' in request.session:
        del request.session['user_id']
    data = {'message': 'Logout successful.'}
    return Response(data)

@api_view(['POST'])
def admin_login(request):
    if request.method == 'POST':
        admin_username = request.data.get('username')
        admin_password = request.data.get('password')
        admin = authenticate(username=admin_username, password=admin_password)
        try:
            admin = User.objects.get(username=admin_username, password=admin_password)
            request.session['is_admin'] = True
            print(request.session['is_admin'])
            data = {'message': 'Admin login successful.', 'user_id': admin.id}
            return Response(data)
        except User.DoesNotExist:
            data = {'error': 'Invalid credentials.'}
            return Response(data, status=400)

        # if admin_username == 'admin' and admin_password == 'admin':
        #     request.session['is_admin'] = True
        #     data = {'message': 'Admin login successful.'}
        #     return Response(data)
        # else:
        #     data = {'error': 'Invalid credentials.'}
        #     return Response(data, status=400)

@csrf_exempt
@api_view(['POST'])
def add_center(request):
    if request.method == 'POST':
        center_name = request.data.get('center_name')
        working_hours = request.data.get('working_hours')

        try:
            VaccinationCenter.objects.create(name=center_name, working_hours=working_hours)
            data = {'message': 'Center added successfully.'}
            return Response(data)
        except:
            data = {'error': 'Error adding center.'}
            return Response(data, status=400)

@csrf_exempt
@api_view(['GET'])
def dosage_details(request):
    # if (request.session["is_admin"]==):
        # data = {'error': 'Admin not logged in.'}
        # return Response(data, status=401)

    centers = VaccinationCenter.objects.all()
    dosage_details = []
    for center in centers:
        slots = VaccinationSlot.objects.filter(center=center)
        center_details = {
            'center_id': center.id,
            'center_name': center.name,
            'total_dosage': len(slots),
        }
        dosage_details.append(center_details)
    return Response(dosage_details)

@csrf_exempt
@api_view(['DELETE'])
def remove_center(request):
    # if 'is_admin' not in request.session:
    #     data = {'error': 'Admin not logged in.'}
    #     return Response(data, status=401)
    print(request.data)
    center_id = request.data["center_id"]
    center_id = int(center_id)
    try:
        center = VaccinationCenter.objects.get(pk=center_id)
        center.delete()
        data = {'message': 'Center removed successfully.'}
        return Response(data)
    except VaccinationCenter.DoesNotExist:
        data = {'error': 'Center not found.'}
        return Response(data, status=404)