const cursos = require('../models/cursos')

const getAll = (req, res) => {
    console.log(req.url);
    cursos.find(function (err, cursos){
    if (err) {
        res.status(500).send({ message: err.message })
        } else {
        res.status(200).send(cursos)
        }
    })
}

const getPorTurno = (req, res) => {
    const horario = req.params.horario
    cursos.find({ horario }, function (err, curso) {
        if (err) {
        res.status(500).send({ message: err.message })
        } else {
        res.status(200).send(curso);
        }
    })
}

const getById = (req, res) => {
    const id = req.params.id
    cursos.find({ id }, function (err, curso) {
      if (err) {
        res.status(500).send({ message: err.message })
      } else {
        res.status(200).send(curso);
      }
    })
}

const getBootcamps = (req, res) => {
    console.log(req.url);
    cursos.find({ bootcamp: true }, function (err, cursos) {
      if (err) {
        res.status(500).send({ message: err.message })
      } else {
        res.status(200).send(cursos);
      }
    })
}

const getCursosGratuitos = (req, res) => {
    console.log(req.url);
    const estado = req.params.estado
  cursos.find({ estado, gratuito: true }, function (err, cursos) {
    if (err) {
        res.status(500).send({ message: err.message })
      } else {
        res.status(200).send(cursos);
      }
  })
}

const getCursosPagos = (req, res) => {
    console.log(req.url);
  cursos.find({ estado, gratuito: true }, function (err, cursos) {
    if (err) {
        res.status(500).send({ message: err.message })
      } else {
        res.status(200).send(cursos);
      }
  })
}

const postCurso = (req, res) => {
    cursos.countDocuments((err, count) => {
        if (err) {
            res.status(424).send({message: err.message});
        } else {
            let curso = new cursos(req.body);
            curso.id = count +1;
            curso.save(function (err) {
                if (err) {
                    res.status(500).send({ message: err.message })
                } else {
                    res.status(201).send({
                        message: "Curso cadastrado com sucesso",
                        status: "true"
                    });
                }
            });
        }
    });
}

const deleteCurso = (req, res) => {
    const id = req.params.id
    cursos.deleteMany({ id}, function (err, curso){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(201).send({
            message: "Curso excluido com sucesso",
            status: "true"
        })
        }
    })
}

const deleteCursosPorTurno = (req, res) => {
    const horario = req.query
    cursos.deleteMany( horario, function (err) {
        if (err) {
            res.status(500).send({ message: err.message })
          } else {
            res.status(200).send({
                message: "Cursos excluídos com sucesso",
                status: "true"
            });
          }
      })
}

const putCurso = (req, res) => {
    const id = req.params.id
    cursos.updateMany({ id },{ $set: req.body },{ upsert: true },function (err) {
        if (err) { 
            res.status(500).send(err) 
        } else { 
            res.status(200).send({ 
                mensagem: "Curso atualizado com sucesso!" 
            }) 
        }
    })
}

module.exports = {
    getAll,
    getPorTurno,
    getById,
    getBootcamps,
    getCursosGratuitos,
    getCursosPagos,
    postCurso,
    deleteCurso,
    deleteCursosPorTurno,
    putCurso
}