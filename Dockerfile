FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

WORKDIR /code

COPY . .

RUN dotnet restore

RUN npm install /code/ClientApp

RUN dotnet publish -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /code

RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
RUN apt-get clean
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get update --fix-missing
RUN apt-get install -y --no-install-recommends --fix-missing python3
RUN apt-get install -y --no-install-recommends --fix-missing python3-pip
RUN apt-get install -y --no-install-recommends --fix-missing python3-venv

COPY --from=build /code/out .
COPY ./FastAPI /code/FastAPI

RUN python3 -m venv venv
ENV PATH="venv/bin:$PATH"

RUN pip install -r /code/FastAPI/requirements.txt

ENTRYPOINT ["dotnet", "CSI-Brady.dll"]