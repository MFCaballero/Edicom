let data = [
    {
    amenityId: 1,
    createdAt: "2021-06-26T18:38:53.118Z",
    finish: "2021-06-30T16:50:00.000Z",
    id: 1,
    start: "2021-06-24T16:50:00.000Z",
    status: "free",
    updatedAt: "2021-06-26T18:38:54.156Z",
    userId: null
},
{
    amenityId: 1,
    createdAt: "2021-06-26T18:38:53.118Z",
    finish: "2021-06-30T16:50:00.000Z",
    id: 2,
    start: "2021-06-24T16:50:00.000Z",
    status: "free",
    updatedAt: "2021-06-26T18:38:54.156Z",
    userId: null
},
{
    amenityId: 1,
    createdAt: "2021-06-26T18:38:53.118Z",
    finish: "2021-06-30T17:50:00.000Z",
    id: 3,
    start: "2021-06-24T17:50:00.000Z",
    status: "free",
    updatedAt: "2021-06-26T18:38:54.156Z",
    userId: null
},{
    amenityId: 1,
    createdAt: "2021-06-26T18:38:53.118Z",
    finish: "2021-06-30T17:50:00.000Z",
    id: 4,
    start: "2021-06-24T17:50:00.000Z",
    status: "free",
    updatedAt: "2021-06-26T18:38:54.156Z",
    userId: null
}
];


// let result = data.filter((item,index)=>{
//     return data[data.indexOf(item)].start === item.start;
// })

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  
  
var arr = [ 
    { Phase: "Phase 1", Step: "Step 1", Task: "Task 1", Value: "5" },
    { Phase: "Phase 1", Step: "Step 1", Task: "Task 2", Value: "10" },
    { Phase: "Phase 1", Step: "Step 2", Task: "Task 1", Value: "15" },
    { Phase: "Phase 1", Step: "Step 2", Task: "Task 2", Value: "20" },
    { Phase: "Phase 2", Step: "Step 1", Task: "Task 1", Value: "25" },
    { Phase: "Phase 2", Step: "Step 1", Task: "Task 2", Value: "30" },
    { Phase: "Phase 2", Step: "Step 2", Task: "Task 1", Value: "35" },
    { Phase: "Phase 2", Step: "Step 2", Task: "Task 2", Value: "40" }
]

// [
//     { Phase: "Phase 1", Value: 50 },
//     { Phase: "Phase 2", Value: 130 }
// ]
    
console.log(groupBy(data, 'start'));