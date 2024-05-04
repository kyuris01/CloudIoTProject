
//버튼 클릭시 인증 URL로 리디렉션
app.get("/auth/google", (req, res) => {
    res.redirect(OAUTH_URL);
  });