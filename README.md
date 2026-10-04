# 🔐 Vulnerable Demo API — DevSecOps Pipeline

> **Proyecto académico** que demuestra cómo integrar herramientas de seguridad (SAST, detección de secretos y SCA) en un pipeline CI/CD automatizado.

[![Security Scan](https://github.com/UsherHalanoccaRojas/devsecops-scan-pipeline/actions/workflows/security-scan-deploy.yml/badge.svg)](https://github.com/UsherHalanoccaRojas/devsecops-scan-pipeline/actions)

---

## 📋 Descripción

API REST en Node.js/Express que contiene **vulnerabilidades intencionales** para demostrar cómo las herramientas de seguridad las detectan automáticamente en un pipeline CI/CD.

## ⚠️ Vulnerabilidades incluidas (intencionales)

| # | Vulnerabilidad | Herramienta que la detecta |
|---|---------------|---------------------------|
| 1 | JWT Secret hardcodeado | Gitleaks |
| 2 | Stripe API Key en código | Gitleaks |
| 3 | AWS Access Key expuesta | Gitleaks |
| 4 | SQL Injection en login | Semgrep |
| 5 | Log de contraseñas | Semgrep |
| 6 | SQL Injection en /users/:id | Semgrep |
| 7 | SQL Injection en búsqueda | Semgrep |
| 8 | Uso de `eval()` con input externo | Semgrep |
| 9 | lodash 4.17.20 (CVE-2021-23337) | Trivy |
| 10 | jsonwebtoken 8.5.1 (CVE-2022-23529) | Trivy |

## 🛠️ Herramientas de seguridad

| Herramienta | Tipo | Propósito |
|-------------|------|-----------|
| **Semgrep** | SAST | Detecta patrones inseguros en el código |
| **Gitleaks** | Secret Detection | Detecta credenciales y tokens en el historial |
| **Trivy** | SCA / IaC | Detecta dependencias con CVEs conocidos |

## 🚀 Pipeline CI/CD

```
Push → Semgrep ──┐
              ├──→ ✅ Deploy (Render)
Push → Gitleaks ─┤
              │
Push → Trivy ───┘
```

El despliegue solo ocurre si **los 3 escáneres pasan**.

## 📁 Estructura del proyecto

```
devsecops-scan-pipeline/
├── .github/
│   └── workflows/
│       └── security-scan-deploy.yml   # Pipeline CI/CD
├── app/
│   ├── server.js                      # API con vulnerabilidades intencionales
│   ├── db.js                          # Módulo de base de datos
│   ├── package.json                   # Dependencias (con versiones vulnerables)
│   └── .env.example                   # Template de variables de entorno
├── Dockerfile                         # Contenedor Docker
├── render.yaml                        # Configuración de despliegue en Render
└── README.md
```

## 🏃 Ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/devsecops-scan-pipeline.git
cd devsecops-scan-pipeline/app

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Ejecutar
npm start
# → API disponible en http://localhost:3000
```

## 🔍 Escanear manualmente

### Semgrep
```bash
pip install semgrep
semgrep --config "p/nodejs" --config "p/owasp-top-ten" app/
```

### Gitleaks
```bash
# macOS
brew install gitleaks

# Windows (via Chocolatey)
choco install gitleaks

# Ejecutar
gitleaks detect --source . -v
```

### Trivy
```bash
# macOS
brew install aquasecurity/trivy/trivy

# Windows (via Chocolatey)
choco install trivy

# Escanear dependencias
trivy fs ./app

# Escanear configuración (Dockerfile, etc.)
trivy config .
```

## ☁️ Despliegue

App desplegada en: **[https://vulnerable-demo-api.onrender.com](https://vulnerable-demo-api.onrender.com)**

## 🔐 Configurar GitHub Secrets

En `Settings → Secrets and variables → Actions` del repositorio, agregar:

| Secret | Descripción |
|--------|-------------|
| `RENDER_DEPLOY_HOOK_URL` | URL del webhook de Render |
| `APP_URL` | URL pública de la aplicación |

## 👥 Equipo

- [Nombre 1] — [Rol]
- [Nombre 2] — [Rol]

## 📚 Referencias

- [OWASP Source Code Analysis Tools](https://owasp.org/www-community/Source_Code_Analysis_Tools)
- [NIST Source Code Security Analyzers](https://www.nist.gov/itl/ssd/software-quality-group/source-code-security-analyzers)
- [Semgrep Docs](https://semgrep.dev/docs/)
- [Gitleaks](https://github.com/gitleaks/gitleaks)
- [Trivy Docs](https://aquasecurity.github.io/trivy/)
