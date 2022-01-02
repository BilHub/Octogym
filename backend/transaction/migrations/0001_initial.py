# Generated by Django 3.1.6 on 2021-12-30 10:09

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('client', '0001_initial'),
        ('abonnement', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=0, default=0, max_digits=11)),
                ('date_creation', models.DateField(default=datetime.date.today)),
                ('notes', models.TextField(blank=True, null=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-last_modified'],
            },
        ),
        migrations.CreateModel(
            name='Autre',
            fields=[
                ('transaction_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='transaction.transaction')),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
            ],
            options={
                'ordering': ['-date_creation'],
            },
            bases=('transaction.transaction',),
        ),
        migrations.CreateModel(
            name='RemunerationProf',
            fields=[
                ('transaction_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='transaction.transaction')),
                ('coach', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='rem_coachs', to='client.coach')),
            ],
            options={
                'ordering': ['-date_creation'],
            },
            bases=('transaction.transaction',),
        ),
        migrations.CreateModel(
            name='Remuneration',
            fields=[
                ('transaction_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='transaction.transaction')),
                ('nom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='rem_personnels', to='client.personnel')),
            ],
            options={
                'ordering': ['-date_creation'],
            },
            bases=('transaction.transaction',),
        ),
        migrations.CreateModel(
            name='Paiement',
            fields=[
                ('transaction_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='transaction.transaction')),
                ('abonnement_client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='transactions', to='abonnement.abonnementclient')),
            ],
            options={
                'ordering': ['-last_modified'],
            },
            bases=('transaction.transaction',),
        ),
        migrations.CreateModel(
            name='AssuranceTransaction',
            fields=[
                ('transaction_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='transaction.transaction')),
                ('client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assurances', to='client.client')),
            ],
            options={
                'ordering': ['-date_creation'],
            },
            bases=('transaction.transaction',),
        ),
    ]
