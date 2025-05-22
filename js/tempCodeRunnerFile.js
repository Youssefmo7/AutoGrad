const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNjg3MWEyLTI0YTctNGFkZC05NjA0LTNkYzZmMTRhNmNmNiIsImp0aSI6ImM3YzZiMGExLWIwZjktNGUzNi05YTk4LWJmZjAzYWI4Nzc5YiIsInJvbGUiOiJEb2N0b3IiLCJleHBpcmVzQXQiOiIyMDI2LTAzLTE4VDAwOjU1OjA4LjcwOTI3NTBaIiwiZXhwIjoxNzczNzk1MzA4LCJpc3MiOiJNeUF3ZXNvbWVBcHAiLCJhdWQiOiJNeUF3ZXNvbWVBdWRpZW5jZSJ9.r7z_JAOa4Fmtdh3Wfbfk-wjyIm-GevXdIy8rgjc7lvk";

// Step 2: Call GetAllTeamsName with Authorization header
const teamResponse = await fetch(
  "https://autogradproject.azurewebsites.net/api/Team/GetAllTeamsName",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

console.log("Team request status:", teamResponse.status);

const teamText = await teamResponse.text();
try {
  const teams = JSON.parse(teamText);
  console.log("Teams:", teams);
} catch (e) {
  console.error("Failed to parse team response as JSON:", e);
  console.log("Raw team response:", teamText);
}