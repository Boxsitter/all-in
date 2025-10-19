@echo off
REM Batch script to compile Twine story with custom styles
REM Usage: compile-story.bat

echo Compiling All In Demo story...

REM Set variables
set TWEEGO_PATH=tweego\tweego.exe
set STORY_FILE=story.twee
set OUTPUT_FILE=story.html
set CUSTOM_STYLES=story-styles.css
set STORY_FORMAT=harlowe-3

REM Check if Tweego exists
if not exist "%TWEEGO_PATH%" (
    echo ERROR: Tweego executable not found at: %TWEEGO_PATH%
    echo Please ensure Tweego is properly installed in the tweego folder.
    pause
    exit /b 1
)

REM Check if story file exists
if not exist "%STORY_FILE%" (
    echo ERROR: Story file not found: %STORY_FILE%
    pause
    exit /b 1
)

REM Check if custom styles exist
if not exist "%CUSTOM_STYLES%" (
    echo WARNING: Custom styles file not found: %CUSTOM_STYLES%
    echo Story will be compiled without custom styles.
    set STYLE_ARG=
) else (
    echo Found custom styles: %CUSTOM_STYLES%
    set STYLE_ARG=-m "%CUSTOM_STYLES%"
)

echo.
echo Compilation details:
echo - Input: %STORY_FILE%
echo - Output: %OUTPUT_FILE%
echo - Format: %STORY_FORMAT%
echo - Custom styles: %CUSTOM_STYLES%
echo.

REM Run Tweego compilation
echo Running Tweego...
"%TWEEGO_PATH%" -o "%OUTPUT_FILE%" %STYLE_ARG% -f "%STORY_FORMAT%" "%STORY_FILE%"

REM Check if compilation succeeded
if %errorlevel% equ 0 (
    echo.
    echo SUCCESS: Story compiled successfully!
    echo Output file: %OUTPUT_FILE%
    echo.
    echo Your story is ready to be embedded in index.html.
    echo The iframe in index.html will automatically load the new story.
    echo.
    echo To test: Open index.html in your web browser.
) else (
    echo.
    echo ERROR: Compilation failed with error code %errorlevel%
    echo Please check the error messages above.
)

echo.
pause