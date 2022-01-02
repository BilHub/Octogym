from .models import Planning
from rest_framework import serializers 
from salle_sport.serializers import SalleSportSerialiser, NameSalleSportSerialiser
from salle_sport.models import SalleSport


class PlanningListSerialiser(serializers.ModelSerializer):
    salle_sport = NameSalleSportSerialiser()
    class Meta:
        model = Planning
        fields= ('id', 'name', 'salle_sport')



class PlanningSerialiser(serializers.ModelSerializer):
    salle_sport = serializers.PrimaryKeyRelatedField(queryset= SalleSport.objects.all(),source='salle_sport.name')
    class Meta:
        model = Planning
        fields= ('id', 'name', 'salle_sport')


    def create(self, validated_data):
        plan = Planning.objects.create(salle_sport=(validated_data)['salle_sport']['name'], name=validated_data['name'])
        return plan

    # def update(self, instance, validated_data):
        
    #     instance.name = validated_data.get('name', instance.name) 
    #     instance.save()
    #     salle = validated_data.get('salle_sport') 
    #     instance.salle_sport.name = salle.get('name')
    #     instance.salle_sport.save()
    #     return instance

    # def update(self, instance, validated_data):
    #     salle_data = validated_data.pop('salle_sport')
    #     salle_sport_serializer = serializers.PrimaryKeyRelatedField(queryset= SalleSport.objects.all(),source='salle_sport.name')
    #     super(self.__class__, self).update(instance,validated_data)
    #     super(PlanningSerialiser,self).update(instance.salle_sport,salle_data)
    #     return instance



    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name) 
        instance.save()
        salle = validated_data.get('salle_sport') 
        actuel = Planning.objects.get(pk = instance.pk) 
        actuel.salle_sport = salle['name']
        actuel.save()

        
        print('INSTAAAANCE', salle['name'])
        print('actuel.salle_sport', actuel.salle_sport)
        print('22222222INSTAAAANCE', instance.id)
        # plan = Planning.objects.update(salle_sport=validated_data['salle_sport']['name'], name=validated_data['name'])

        return instance


















# class UpdatePlanningSerializer(serializers.ModelSerializer):
#     salle = SalleSportSerialiser()
#     class Meta:
#         fields= '__all__'
    
#     def update(self, instance, validated_data):
#         salle_data = validated_data.pop('salle_sport')
#         salle = instance.salle_sport

#         instance.name = validated_data.get('name', instance.name)
#         instance.save()
#         # print('saaaaaale', salle.id)
#         # print('saaaaaale DATZA', salle_data['name'])
#         # print('saaaaaale DATZA', salle_sport)
#         # # new_salle = salle_data['id']
#         # # salle_sport = validated_data['salle_sport']
#         salle.name = validated_data.get('salle_sport', salle.name)
        
#         print('saaaaaale NAMEEE', salle.name)
#         # salle.id= new_salle
#         salle_sport.save()