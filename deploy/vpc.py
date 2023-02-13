import json

with open('temp/security-groups.json') as f:
    data = json.load(f)

GroupId = (data['SecurityGroups'][0]['GroupId'])
vpc_id = (data['SecurityGroups'][0]['VpcId'])
accountid = (data['SecurityGroups'][0]['OwnerId'])

f = open("temp/securitygroup1", "a")
f.write(GroupId)
f.close()

f = open("temp/accountid", "a")
f.write(accountid)
f.close()

f = open("temp/vpcid", "a")
f.write(vpc_id)
f.close()

with open('temp/subnets.json') as f:
    data = json.load(f)

SubnetId01 = (data['Subnets'][0]['SubnetId'])
SubnetId02 = (data['Subnets'][1]['SubnetId'])

f = open("temp/subnetid01", "a")
f.write(SubnetId01)
f.close()

f = open("temp/subnetid02", "a")
f.write(SubnetId02)
f.close()


with open('temp/list-hosted-zones.json') as f:
    data = json.load(f)

HostedZones = (data['HostedZones'][0]['Name'])

f = open("temp/HostedZones", "a")
f.write(HostedZones[:-1])
f.close()

with open('temp/secrets.json') as f:
    data = json.load(f)

HostedZones = (data['ARN'])

f = open("temp/secretsarns", "a")
f.write(HostedZones)
f.close()