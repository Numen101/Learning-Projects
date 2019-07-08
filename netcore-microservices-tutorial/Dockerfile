FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY netcore-microservices-tutorial.csproj netcore-microservices-tutorial/
RUN dotnet restore netcore-microservices-tutorial/netcore-microservices-tutorial.csproj
WORKDIR /src/netcore-microservices-tutorial
COPY . .
RUN dotnet build netcore-microservices-tutorial.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish netcore-microservices-tutorial.csproj -c Release -o /app

FROM base AS final
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "netcore-microservices-tutorial.dll"]