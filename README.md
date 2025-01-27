# FACTUS API Integration Project

## Overview
This project demonstrates the integration of FACTUS API for electronic billing in Colombia. FACTUS is a service provided by HALLTEC, a Colombian Software Company, that enables businesses to generate and manage electronic invoices compliant with Colombian regulations.

## Description
The solution implements a complete integration with FACTUS API, allowing users to:
- Generate electronic invoices
- Manage billing information
- Comply with Colombian electronic billing requirements
- Handle responses and notifications from FACTUS system

## Getting Started

### Prerequisites
- .NET Core SDK (version will be specified)
- API credentials from HALLTEC
- Basic understanding of electronic billing in Colombia

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/FACTUS.git
cd FACTUS/billing
```

2. Configure your environment variables
```bash
# Create a .env file with your FACTUS API credentials
NEXT_PUBLIC_URL_API="<entry point>"
NEXT_PUBLIC_EMAIL="<your access email>"
NEXT_PUBLIC_PASSWORD="<your password>"
NEXT_PUBLIC_CLIENT_ID="<your client id>"
NEXT_PUBLIC_CLIENT_SECRET="<your client secret>"
NEXT_PUBLIC_GRANT_TYPE="<password>"
NEXT_PUBLIC_URL_BACKEND="url of your backend or fake backend like a json-server"
```

3. Install dependencies
```bash
dotnet restore
```

4. Run the project
```bash
dotnet run
```

