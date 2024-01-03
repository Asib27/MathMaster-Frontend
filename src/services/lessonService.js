
const lesson = {
    content: [
      `We have learned the basics of function in the previous lessons. Now it's time to explore function parameters.
      A **parameter** A parameter is like a **control knob** for a function. Changing the parameter changes the function in a smooth way.
      Here's an example of a simple <Definition text={"linear"} definition={"A **linear function** is a function whose graph is a straight line, commonly written $f(x)=mx+b$."} /> function with a parameter $m$ that controls the <Definition text={"slope"} definition={"The **slope** of a line is the ratio between the change of $y$ and the change of $x$. It describes the steepness of a line."} />
  
      <Graph 
        equations={
          [{
            type: "plot",
            y: "x => p[0]*x + 2",
            text: "f(x) = mx + 2"
          }]
        }
        parameters={[2]}
        ranges={[["m", -3, 3]]}
      />
      
      <Callout type="normal">This is a dummy callout.</Callout>
  
      <Graph 
        equations={
          [
            {
              type: "plot",
              y: "x => p[0]*x + 2",
              text: "f(x) = mx + 2"
            },
            {
              type: "point",
              x: 1,
              y: 1,
            }
        ]
        }
        parameters={[2]}
        ranges={[["m", -5, 5, 1]]}
      />
  
      <Example
        type="mcq"
        question="For what value of parameter $m$ does the line intersect the point?"
        options={[-1, -2, -3, -4]}
        correct={0}
        explanation="demo $x$"
      />
  
  
  
      <Graph
      equations={
        [
          {
            type: "plot",
            y: "x =>p[0]*x+4"
          },
          {
            type: "plot",
            y: "x=> p[0]*x*x"
  
          },
          {
            type: "point",
            x: -1,
            y: 2,
          }
        ]
  
      }
      parameters={[0]}
      ranges={[["a",-4,4,1]]}
  
    />
  
    These functions both depend on the parameter $a$ :
  
    $$
    y=ax+4 
    $$
  
    $$ 
    y=ax^2
    $$
  
  
    <Example
    type="mcq"
    question="What parameter value $a$ leads both lines to intersect at the yellow target point $(-1,2)$?"
    options={[-2, -1, 1, 2]}
    correct={3}
    explanation=
    "
    If a function goes through the point $(-1,2)$, this means that for the input $-1$, the output is $2$.
    
    Substitute these values into the first relationship:
  
    $$y=a*x+4$$
    $$ 2=a(-1)+4 $$ 
    $$\\implies a=2.$$
  
    This means that when $a=2$, the straight line goes through our target point.
    
    Then we check whether this parameter value leads the parabola through the target, too:
  
  
    $$
    y=ax^2$$
    $$
    2=(2)(-1)^2$$
    $$
    \\implies 2=2
    $$"
    />
  
  
  
    <Graph
    equations={
      [
        {
          type: "plot",
          y: "x => p[1]*x+p[2]"
          
        },
        {
          type: "plot",
          y: "x=> p[0]*x*x"
        },
        
      ]
  
    }
    parameters={[0, 1, -2]}
    ranges={[["a",-5,5,0.5],["b",-5,5,0.5],["c",-5,5,0.5]]}
  
  />
    
    
  Here're two functions $-$ one with parameter $a$ and the other with separate parameters $b$ and $c$:
  
  $$
  f(x)=ax^2
  $$
  
  $$
  g(x)=bx+c.
  $$
  
  
  <Example
  type="mcq"
  question="When is it possible that the two graphs don't intersect?"
  options={["When $a<0,b<0,$ and $c=0$","When $a<0$ and $c<0$","When $a>0$ and $c<0$"]}
  correct={2}
  explanation=
  "
  Parameter $a$ controls the orientation of the $U$-shaped quadradic function of $f(x)$.
  If $a$ is positive, the graph opens upward from the point $(0,0)$.
  
  $$
  
  $$
  
  Parameter $c$ controls the $y$-intercept,or vertical shift, of the graph of $g(x)$. If $c$ is negative, then $g(x)$ can intersect the $y$-axis below $f(x)$ and avoid $f(x)$.
  
  "
  
  />
  
  
  
  So far, we've seen that function parameters can control various features of a function like its shape and height.
  
  We've also adjusted these parameters to meet a goal, like creating an intersection.
  
  
  <Graph
  equations={
    [
      {
        type: "plot",
        y: "x => Math.sqrt(p[0]*p[0]-(x-0.5)*(x-0.5))+1.5"
        
      },
      {
        type: "plot",
        y: "x => -1*Math.sqrt(4-(x-0.5)*(x-0.5))+1.5"
        
      }
      
    ]
  
  }
  parameters={[1]}
  ranges={[["a",0,4,0.5]]}
  
  />
  Adjust the parameter $a$ to complete the circle
  
  $$
  f(x)=\\sqrt{a^2-(x-0.5)^2}+1.5
  $$
  
  <Example
  type="mcq"
  question="What does the parameter $a$ represent?"
  options={["The height of the center","The radius of the circle","The square root of the radius of the circle"]}
  correct={1}
  explanation=
  "
  Recall that a circle has equation $x^2+y^2=a^2$, where $a$ is the radius.
  $$
  
  $$
  
  Solving for $y$, we find the two equations $y=\\pm \\sqrt{a^2 - x^2}.$ The positive solution corresponds to the top of the circle.
  
  $$
  
  $$
  In this case, our function has also been shifted up and to the right.
  "
  />
  
  
  <Graph
  equations={
    [
      {
        type: "plot",
        y: "x => (x+1.5*p[0])*(x-2*p[0])*(x+p[0])-p[0]"
        
      }
      
    ]
  
  }
  parameters={[0]}
  ranges={[["a",-10,10,1]]}
  box={{
    x: [-20,20], y: [-20,20],
  }}
  />
  
  
  In the previous example, the parameter $a$ corresponded to a clear geometric feature.
  
  In this example, the meaning of the control isn't nearly as intuitive.
  
  
  <Graph
  equations={
    [
      {
        type: "plot",
        y: "x => (x-p[0])*(x-p[0])"
        
      },
      {
        type: "plot",
        y: "x=> x*x*x+p[0]"
      },
      
    ]
  
  }
  parameters={[0]}
  ranges={[["a",-5,5,0.5]]}
  
  box={{x:[-5,5],y:[-5,5]}}
  
  />
  
  These two functions intersect for many parameter values:
  
  $$
  y=(x-a)^2
  $$
  
  $$
  y=x^3+a
  $$
  
  <Example
  type="mcq"
  question="Is there a value of the parameter $a$ for which the two functions don't intersect?"
  options={["Yes","No"]}
  correct={1}
  explanation=
  "
  The graph of each function continues indefinitely to the left and right. That is, for any value $x$, there's some output $y$.
  
  $$
  
  $$
  
  
  The graph of $y=x^3+a$ rises and falls more steeply than that of $y=(x-a)^2$, so it'll eventually overtake the quadratic.
  
  $$
  
  $$
  
  Keep in mind that a graph visualization with a fixed window may not show the whole picture.
  
  
  "
  />
  
  
  Sometimes the effect of parameters is clear, while sometimes it's quite complicated.
  
  Also, we should be careful when adjusting parameters to consider what's happening outside our field of view.
  
  
  
  <Graph
  equations={
  [
    {
      type: "plot",
      y: "x => p[0]*x + p[1]"
    },
    {
      type: "point",
      x: 0,
      y: 15.4,
    },
    {
      type: "point",
      x: 2,
      y: 16.8,
    },{
      type: "point",
      x: 4,
      y: 18.6,
    },{
      type: "point",
      x: 6,
      y: 20.5,
    },{
      type: "point",
      x: 8,
      y: 22,
    },{
      type: "point",
      x: 10,
      y: 22.7,
    },{
      type: "point",
      x: 12,
      y: 24.5,
    },{
      type: "point",
      x: 14,
      y: 26.7,
    },{
      type: "point",
      x: 16,
      y: 29.5,
    },{
      type: "point",
      x: 18,
      y: 31.8,
    }
  ]
  
  }
  parameters={[0.5,1]}
  ranges={[["m",0.5,1.5,0.1],["b",1,20,1]]}
  
  box={{x:[10,25],y:[-1,40]}}
  zoom={false}
  legendX=""
  />
  
  
  Playing with parameters is part of the process of modeling data. Here we use a simple linear model with two parameters: $m$ is the slope and $b$ is the $y$-intercept.
  
  
  This graph shows the average cost of attendance for a $4$-year private college in the United States.
  
  <Example
  type="mcq"
  question="What's the best estimate of the average tuition in $2017$?"
  options={["$28000","$30000","$34000","$38000"]}
  correct={2}
  explanation=
  "
  Adjusting the parameters of the linear model to fit the data, we find a line similar to this one.
  
  In this case, our linear model does a good job predicting the real cost.
  
  Be careful, though. Not all data follows linear trends and trends that appear linear now are liable to change.
  
  "
  />
      `,
"We $sa_2 b^4$ have learned the basics of function in the previous lessons. Now it's time to explore function parameters.\
A **parameter** A parameter is like a **control knob** for a function. Changing the parameter changes the function in a smooth way.\
Simple <Definition text={'linear'} definition={'A **linear function** is a function'} /> \
\n```callout\n\
I am a callout $a_2$\n\
```\
",
      `A paragraph with *emphasis* and **strong importance**`,
      ``,
      ``,
    ],
  };
  
const content = "We $sa_2 b^4$ have learned the basics of function in the previous lessons. Now it's time to explore function parameters.\
A **parameter** A parameter is like a **control knob** for a function. Changing the parameter changes the function in a smooth way.\
Simple <Definition text={'linear'} definition={'A **linear function** is a function'} /> \
\n```callout\n\
I am a callout $a_2$\n\
```\
"

const lesson1 = {
  id: '1',
  name: 'Lesson1',
  content: content,
  completed: false,
  vote: 1,
  authors: [
      {
          id: '1',
          name: 'Shariful Rahi'
      },
      {
          id: '2',
          name: 'Rahi Khan'
      }
  ],
}

export async function getLesson(lessonId){
  await fakeNetwork();
  console.log(lessonId);
  return lesson1;
}

async function fakeNetwork() {
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}
