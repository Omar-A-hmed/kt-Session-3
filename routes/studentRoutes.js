const express = require('express');
const router = express.Router();

// STUDENT DATA 
let students = [
    { id: 1, name: "Omar", dept: "CSE", age: 19 },
    { id: 2, name: "Dorai", dept: "CSE", age: 21},
    { id: 3, name: "Yuvaraj", dept: "CSE", age: 21 },
    { id: 4, name: "Fizal", dept: "CSE", age: 22 },
    { id: 5, name: "Abishek", dept: "CSE", age: 23 },
    { id: 6, name: "Farhan", dept: "CSE", age: 22 },
    { id: 7, name: "Vaishnav", dept: "CSE", age: 21 },
    { id: 8, name: "Raj", dept: "CSE", age: 21 },
];



router.get('/', (req, res) => {
    res.json(students);
});



router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});


// CREATE 
router.post('/', (req, res) => {
    const { name, dept, age } = req.body;

    if (!name || !dept || !age) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        dept,
        age
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});


// UPDATE 
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, dept, age } = req.body;

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (name) student.name = name;
    if (dept) student.dept = dept;
    if (age) student.age = age;

    res.json({
        message: "Student updated successfully",
        student
    });
});


// DELETE 
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


// EXPORT
module.exports = router;
