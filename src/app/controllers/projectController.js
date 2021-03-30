
const express = require('express');

const authMiddleware =  require('../middlewares/auth');

const Project = require('../models/projects');
const Task = require('../models/tasks');

const router = express.Router();

router.use(authMiddleware);

router.get('/',async(req, res) =>{

    try{
         // eager loading
        const project = await Project.find().populate(['user','tasks']);

        return res.send({ project });
    }
    catch(err){
        return res.status(400).send({ error: 'Erro loading project' });
    }
});

router.get('/:projectId',async(req, res) =>{

    try{
          // eager loading
          const project = await Project.findById(req.params.projectId).populate(['user','tasks']);

          return res.send({ project });
    }
    catch(err){
        return res.status(400).send({ error: 'Erro loading project' });
    }
});

router.post('/',async(req, res) =>{

    try{
       const {title, description, tasks} = req.body;

        const project = await Project.create({ title,description, user:req.userId});

        await Promise.all (tasks.map (async task =>{

            const projecTask = new Task({ ... task, project: project._id});

            await projecTask.save();

            project.tasks.push(projecTask);

        }));

        await project.save();

        return res.send({ project });

    }
    catch(err){
        
        return res.status(400).send({ error: 'Erro creating new project' });
    }
});

router.put('/:projectId',async(req, res) => {

    try{
        const {title, description, tasks} = req.body;
 
         const project = await Project.findByIdAndUpdate(
             req.params.projectId, { 
             title,
             description             
            },
            { new:true /*retora o objeto atualizado*/ });
 

            //deletar tasks
            project.tasks = [];
            await Task.remove({ project: project._id });


         await Promise.all (tasks.map (async task =>{
 
             const projecTask = new Task({ ... task, project: project._id});
 
             await projecTask.save();
 
             project.tasks.push(projecTask);
 
         }));
 
         await project.save();
 
         return res.send({ project });
 
     }
     catch(err){
         console.log(err);
         return res.status(400).send({ error: 'Erro update new project' });
     }
});


router.delete('/:projectId',async(req, res) =>{

    try{
        // eager loading
        const project = await Project.findByIdAndRemove(req.params.projectId);

        return res.send();
    }
    catch(err){
      return res.status(400).send({ error: 'Erro deleting project' });
    }
});


module.exports = app => app.use('/projects',router);