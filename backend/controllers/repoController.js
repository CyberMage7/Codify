import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

export async function createRepository(req, res) {
  const { 
    owner, 
    name, 
    description, 
    visibility, 
    primaryLanguage, 
    addReadme, 
    addGitignore, 
    gitignoreTemplate,
    issues,
    content 
  } = req.body;

  try {
    // Enhanced validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Repository name is required!" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    // Validate name format (same as frontend validation)
    if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
      return res.status(400).json({ 
        error: "Repository name can only contain letters, numbers, hyphens, and underscores" 
      });
    }

    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({ 
        error: "Repository name must be between 3 and 50 characters" 
      });
    }

    // Check if repository name already exists for this user
    const existingRepo = await Repository.findOne({ name, owner });
    if (existingRepo) {
      return res.status(400).json({ 
        error: "A repository with this name already exists" 
      });
    }

    // Initialize content array based on options
    let initialContent = content || [];
    
    if (addReadme) {
      const readmeContent = `# ${name}\n\n${description || 'Description of your project'}\n\n## Getting Started\n\nWelcome to your new vault! 🚀\n\n## Features\n\n- Add your features here\n\n## Installation\n\n\`\`\`bash\n# Add installation instructions\n\`\`\`\n\n## Usage\n\n\`\`\`bash\n# Add usage examples\n\`\`\`\n\n## Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n\n## License\n\nThis project is licensed under the MIT License.`;
      initialContent.push(`README.md:${readmeContent}`);
    }

    if (addGitignore) {
      const gitignoreContent = generateGitignoreContent(gitignoreTemplate);
      initialContent.push(`.gitignore:${gitignoreContent}`);
    }

    // Create new repository
    const newRepository = new Repository({
      name: name.trim(),
      description: description?.trim() || '',
      visibility: visibility !== undefined ? visibility : true,
      owner,
      content: initialContent,
      issues: issues || [],
      primaryLanguage: primaryLanguage || 'JavaScript',
      addReadme: addReadme || false,
      addGitignore: addGitignore || false,
      gitignoreTemplate: gitignoreTemplate || 'Node',
    });

    const result = await newRepository.save();

    // Update user's repositories array
    await User.findByIdAndUpdate(
      owner,
      { $push: { repositories: result._id } }
    );

    res.status(201).json({
      message: "Repository created successfully!",
      repository: {
        id: result._id,
        name: result.name,
        description: result.description,
        visibility: result.visibility,
        primaryLanguage: result.primaryLanguage,
        createdAt: result.createdAt
      }
    });

  } catch (error) {
    console.error("Error during repository creation: ", error.message);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: "A repository with this name already exists" 
      });
    }
    
    return res.status(500).json({ 
      error: "Server error", 
      message: error.message 
    });
  }
}

// Helper function to generate .gitignore content
function generateGitignoreContent(template) {
  const gitignoreTemplates = {
    'Node': `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
*.tgz

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Logs
logs
*.log

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history`,

    'Python': `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# PyInstaller
*.manifest
*.spec

# Virtual environments
venv/
env/
ENV/
.venv/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Jupyter Notebook
.ipynb_checkpoints

# pytest
.pytest_cache/

# mypy
.mypy_cache/`,

    'Java': `# Compiled class files
*.class

# Log files
*.log

# Build directories
target/
build/
out/

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# IDE files
.idea/
.vscode/
*.iml
*.ipr
*.iws

# Eclipse
.classpath
.project
.settings/

# NetBeans
nbproject/private/
build/
nbbuild/
dist/
nbdist/
.nb-gradle/

# OS files
.DS_Store
Thumbs.db

# Maven
.mvn/
mvnw
mvnw.cmd`,

    'React': `# Dependencies
node_modules/

# Production build
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Optional npm cache directory
.npm

# ESLint cache
.eslintcache`,

    'Vue': `# Dependencies
node_modules/

# Production build
dist/
.nuxt/

# Local env files
.env
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS
.DS_Store
Thumbs.db`,

    'Angular': `# Dependencies
node_modules/

# Production build
dist/
.angular/

# Environment files
.env
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea/
.vscode/
*.launch
.settings/
*.sublime-workspace

# OS
.DS_Store
Thumbs.db

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# E2E test reports
e2e/reports/`,

    'C++': `# Prerequisites
*.d

# Compiled Object files
*.slo
*.lo
*.o
*.obj

# Precompiled Headers
*.gch
*.pch

# Compiled Dynamic libraries
*.so
*.dylib
*.dll

# Fortran module files
*.mod
*.smod

# Compiled Static libraries
*.lai
*.la
*.a
*.lib

# Executables
*.exe
*.out
*.app

# Build directories
build/
cmake-build-*/

# IDE
.vscode/
.idea/
*.vcxproj.user

# OS
.DS_Store
Thumbs.db`,

    'C#': `# Build results
[Dd]ebug/
[Dd]ebugPublic/
[Rr]elease/
[Rr]eleases/
x64/
x86/
build/
bld/
[Bb]in/
[Oo]bj/

# Visual Studio files
*.suo
*.user
*.userosscache
*.sln.docstates
*.userprefs

# Build Results
[Dd]ebug/
[Rr]elease/
x64/
x86/
build/
bld/
[Bb]in/
[Oo]bj/

# .NET Core
project.lock.json
project.fragment.lock.json
artifacts/

# NuGet Packages
*.nupkg
**/packages/*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db`,

    'Go': `# Binaries for programs and plugins
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary, built with \`go test -c\`
*.test

# Output of the go coverage tool
*.out

# Dependency directories
vendor/

# Go workspace file
go.work

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Air live reload
tmp/`,

    'Rust': `# Generated by Cargo
/target/
Cargo.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Backup files
*~

# Temporary files
*.tmp`,

    'PHP': `# Composer
vendor/
composer.phar
composer.lock

# Environment variables
.env
.env.local
.env.*.local

# Logs
*.log

# Cache
cache/
*.cache

# IDE
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# OS
.DS_Store
Thumbs.db

# Laravel specific
storage/logs/*.log
storage/framework/cache/*
storage/framework/sessions/*
storage/framework/views/*
bootstrap/cache/*`,

    'Ruby': `# Dependencies
.bundle/
vendor/bundle/

# Logs
*.log

# Runtime data
tmp/
.sass-cache/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Rails specific
log/*.log
tmp/**/*
.byebug_history
config/database.yml
public/uploads`,

    'Swift': `# Xcode
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata/
*.moved-aside
*.xccheckout
*.xcscmblueprint
*.xcworkspace
!default.xcworkspace

# CocoaPods
Pods/

# Carthage
Carthage/Build/

# SPM
.swiftpm/
Package.resolved

# IDE
.vscode/

# OS
.DS_Store
Thumbs.db`,

    'Unity': `# Unity generated
[Ll]ibrary/
[Tt]emp/
[Oo]bj/
[Bb]uild/
[Bb]uilds/
[Ll]ogs/
[Uu]ser[Ss]ettings/

# Asset meta data
*.pidb
*.booproj
*.svd
*.pdb
*.mdb
*.opendb
*.VC.db

# Unity3D generated meta files
*.pidb.meta
*.pdb.meta
*.mdb.meta

# Unity3D generated file on crash reports
sysinfo.txt

# Builds
*.apk
*.unitypackage
*.app

# Crashlytics generated file
crashlytics-build.properties

# OS
.DS_Store
Thumbs.db`,

    'MacOS': `# General
.DS_Store
.AppleDouble
.LSOverride

# Icon must end with two \r
Icon

# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories potentially created on remote AFP share
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk`,

    'Windows': `# Windows thumbnail cache files
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db

# Dump file
*.stackdump

# Folder config file
[Dd]esktop.ini

# Recycle Bin used on file shares
$RECYCLE.BIN/

# Windows Installer files
*.cab
*.msi
*.msix
*.msm
*.msp

# Windows shortcuts
*.lnk`,

    'Visual Studio': `# User-specific files
*.rsuser
*.suo
*.user
*.userosscache
*.sln.docstates

# Build results
[Dd]ebug/
[Rr]elease/
x64/
x86/
[Ww][Ii][Nn]32/
[Aa][Rr][Mm]/
[Aa][Rr][Mm]64/
bld/
[Bb]in/
[Oo]bj/
[Ll]og/

# Visual Studio 2015/2017 cache/options directory
.vs/

# MSTest test Results
[Tt]est[Rr]esult*/
[Bb]uild[Ll]og.*

# NUnit
*.VisualState.xml
TestResult.xml
nunit-*.xml`,

    'JetBrains': `# Covers JetBrains IDEs: IntelliJ, RubyMine, PhpStorm, AppCode, PyCharm, CLion, Android Studio, WebStorm and Rider

# User-specific stuff
.idea/**/workspace.xml
.idea/**/tasks.xml
.idea/**/usage.statistics.xml
.idea/**/dictionaries
.idea/**/shelf

# Generated files
.idea/**/contentModel.xml

# Sensitive or high-churn files
.idea/**/dataSources/
.idea/**/dataSources.ids
.idea/**/dataSources.local.xml
.idea/**/sqlDataSources.xml
.idea/**/dynamic.xml
.idea/**/uiDesigner.xml
.idea/**/dbnavigator.xml

# Gradle
.idea/**/gradle.xml
.idea/**/libraries

# File-based project format
*.iws

# IntelliJ
out/

# mpeltonen/sbt-idea plugin
.idea_modules/`
  };

  return gitignoreTemplates[template] || gitignoreTemplates['Node'];
}

export async function getAllRepository(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.json(repositories);
  } catch (error) {
    console.error("Error during fetching repositories: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function fetchRepositoryById(req, res) {
  const { repoID } = req.params;

  try {
    const repository = await Repository.findOne({ _id: repoID })
      .populate("owner")
      .populate("issues");

    res.json(repository);
  } catch (error) {
    console.error("Error during fetching repository: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function fetchRepositoryByName(req, res) {
  const { name } = req.params;

  try {
    const repository = await Repository.find({ name: name })
      .populate("owner")
      .populate("issues");

    res.json(repository);
  } catch (error) {
    console.error("Error during fetching repository: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function fetchRepositoryForCurrentUser(req, res) {
  const userID = req.params.userID;
  try {
    const repositories = await Repository.find({ owner: userID });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "User Repositories not found" });
    }

    res.json({ message: "Repositories found!", repositories });
  } catch (error) {
    console.error("Error during fetching repository: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function updateRepository(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repositories not found!" });
    }

    repository.content.push(content);
    repository.description.push(description);

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository updated successfully!",
      repository: updatedRepository,
    });
  } catch (error) {
    console.error("Error during updating repository: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function toggleVisibilityById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repositories not found!" });
    }

    repository.visibility = !repository.visibility;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository visibility toggled successfully!",
      repository: updatedRepository,
    });
  } catch (error) {
    console.error(
      "Error during updating repository visibility: ",
      error.message
    );
    return res.status(500).send("Server error");
  }
}

export async function deleteRepositoryById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.findByIdAndDelete(id);
    if (!repository) {
      return res.status(404).json({ error: "Repositories not found!" });
    }
    res.json({ message: "Repository deleted Successfully" });
  } catch (error) {
    console.error("Error during deleting repository: ", error.message);
    return res.status(500).send("Server error");
  }
}
