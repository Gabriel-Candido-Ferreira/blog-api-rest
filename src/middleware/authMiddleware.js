const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

function verificarAdmin(req, res, next) {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ message: "Acesso negado. Admin apenas." });
  }
  next();
}

module.exports = { verificarToken, verificarAdmin };
