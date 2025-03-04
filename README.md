# Visual Workspace Safety

## Overview
Visual Workspace Safety is an application designed to enhance workplace safety by leveraging AI to detect OSHA and ANSI violations from user-uploaded images. The app features a C# backend built with ASP.NET and a frontend developed in React.

## Architecture

- **Backend:** C# with ASP.NET
- **Frontend:** React
- **AI API:** Hosted on Azure, analyzes uploaded images for safety violations
- **Database:** Azure SQL Server, storing information on companies, facilities, areas, products, violations, and images
- **Storage:** Azure Blob Storage for image storage

### Database Structure

- **Companies:** Represents organizations (e.g., Google) with multiple facilities
- **Facilities:** Locations under a company, each containing different areas
- **Areas:** Specific spaces within a facility (e.g., boiler room, factory floor)
- **Products:** Safety products recommended based on detected violations
- **Violations:** Detected OSHA/ANSI violations
- **Images:** Stored images linked to violations and areas

## Workflow
1. User uploads an image.
2. The backend sends the image to the AI API.
3. The AI API analyzes the image and returns detected violations.
4. Violations are stored in the database.
5. The image is stored in Azure Blob Storage.
6. Product recommendations are generated based on the violations.

## Getting Started

### Prerequisites

- .NET SDK
- Node.js and npm
- SQL Server
- Azure Storage and AI API access credentials

### Cloning the Repository

```sh
git clone https://github.com/your-repo-url/VisualWorkspaceSafety.git
cd VisualWorkspaceSafety
```

### Backend Setup

1. Navigate to the backend project directory:

```sh
cd Backend
```

2. Restore .NET dependencies:

```sh
dotnet restore
```

3. Build and run the backend:

```sh
dotnet run
```

### Frontend Setup

1. Navigate to the frontend directory:

```sh
cd ClientApp
```

2. Install npm packages:

```sh
npm install
```

3. Start the development server:

```sh
npm start
```

### Database Setup

1. Configure the connection string in `appsettings.json`.
2. Apply migrations:

```sh
dotnet ef database update
```

### Environment Variables

Set the necessary environment variables for Azure services and API keys.

## Running the Application

Once both the backend and frontend are running, you can access the application in your browser at `http://localhost:3000` (or your configured port).

## Conclusion

Visual Workspace Safety streamlines workplace safety analysis, helping organizations proactively address potential hazards through AI-powered image analysis. If you encounter any issues or have questions, feel free to open an issue or contribute to the project!
