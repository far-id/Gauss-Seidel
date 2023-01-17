import { useState } from 'react';

function App() {
  const [equation1, setEquation1] = useState({
    ox: '+',
    x: '',
    oy: '+',
    y: '',
    oz: '+',
    z: '',
    equal: ''
  });
  const [equation2, setEquation2] = useState({
    ox: '+',
    x: '',
    oy: '+',
    y: '',
    oz: '+',
    z: '',
    equal: ''
  });
  const [equation3, setEquation3] = useState({
    ox: '+',
    x: '',
    oy: '+',
    y: '',
    oz: '+',
    z: '',
    equal: ''
  });

  const [result, setResult] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const handleChangeE1 = (e) => {
    setEquation1({
      ...equation1,
      [e.target.name]: parseInt(e.target.value)
    });
  };
  const handleChangeE2 = (e) => {
    setEquation2({
      ...equation2,
      [e.target.name]: parseInt(e.target.value)
    });
  };
  const handleChangeE3 = (e) => {
    setEquation3({
      ...equation3,
      [e.target.name]: parseInt(e.target.value)
    });
  };
  const opration = (oprator, equation) => {
    if (oprator == '+') {
      equation = equation - (2 * equation);
    }
    return equation;
  };
  const calculate = () => {
    let [old_x, old_y, old_z] = [0, 0, 0];

    let new_x = (equation1.equal + (opration(equation1.oy, equation1.y) * old_y) + (opration(equation1.oz, equation1.z) * old_z)) / opration(equation1.x, equation1.x);
    let new_y = (equation2.equal + (opration(equation2.ox, equation2.x) * new_x) + (opration(equation2.oz, equation2.z) * old_z)) / opration(equation2.y, equation2.y);
    let new_z = (equation3.equal + (opration(equation3.ox, equation3.x) * new_x) + (opration(equation3.oy, equation3.y) * new_y)) / opration(equation3.z, equation3.z);

    let difference_x = Math.abs(new_x - old_x);
    let difference_y = Math.abs(new_y - old_y);
    let difference_z = Math.abs(new_z - old_z);

    while (difference_x < 0.0001) {
      [old_x, old_y, old_z] = [new_x, new_y, new_z];

      new_x = (equation1.equal - (equation1.y * old_y) - (equation1.z * old_z)) / equation1.x;
      new_y = (equation2.equal - (equation2.x * new_x) - (equation2.z * old_z)) / equation2.y;
      new_z = (equation3.equal - (equation3.x * new_x) - (equation3.y * new_y)) / equation3.z;

      difference_x = Math.abs(new_x - old_x);
      difference_y = Math.abs(new_y - old_y);
      difference_z = Math.abs(new_z - old_z);
    }
    setResult({
      x: new_x,
      y: new_y,
      z: new_z
    });
  };
  const clear = () => {
    setEquation1({
      ox: '+',
      x: '',
      oy: '+',
      y: '',
      oz: '+',
      z: '',
      equal: ''
    });
    setEquation2({
      ox: '+',
      x: '',
      oy: '+',
      y: '',
      oz: '+',
      z: '',
      equal: ''
    });
    setEquation3({
      ox: '+',
      x: '',
      oy: '+',
      y: '',
      oz: '+',
      z: '',
      equal: ''
    });
    setResult({
      x: 0,
      y: 0,
      z: 0,
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen">
      <div className='grid gap-y-6'>
        <div className='flex justify-center'>
          <p className='font-semibold text-lg italic'>Gauss Seidel</p>
        </div>
        <div className='flex justify-between items-center'>
          <div>
            <p>Equation 1 : {equation1.ox + equation1.x}x {equation1.oy + equation1.y}y {equation1.oz + equation1.z}z = {equation1.equal}</p>
            <p>Equation 2 : {equation2.ox + equation2.x}x {equation2.oy + equation2.y}y {equation2.oz + equation2.z}z = {equation2.equal}</p>
            <p>Equation 3 : {equation3.ox + equation3.x}x {equation3.oy + equation3.y}y {equation3.oz + equation3.z}z = {equation3.equal}</p>
          </div>
          <div className='mr-8'>
            <p>x: {result.x}</p>
            <p>y: {result.y}</p>
            <p>z: {result.z}</p>
            <button onClick={() => clear()} className='px-3 py-2 rounded-lg border-1 bg-gray-200 hover:bg-gray-300'>Clear</button>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <label>Equation 1 : </label>
          <div className='rounded-full border w-4 h-4 flex items-center justify-center px-1 pb-2 pt-1.5 font-semibold'>
            <button onClick={(e) => setEquation1({ ...equation1, ox: equation1.ox == '+' ? '-' : '+' })}>{equation1.ox}</button>
          </div>
          <div className='flex'>
            <input type="number" id="p1-x" name='x' value={equation1.x} onChange={handleChangeE1} className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
              x
            </span>
          </div>
          <div className='rounded-full border w-4 h-4 flex items-center justify-center px-1 pb-2 pt-1.5 font-semibold'>
            <button onClick={(e) => setEquation1({ ...equation1, oy: equation1.oy == '+' ? '-' : '+' })}>{equation1.oy}</button>
          </div>
          <div className='flex'>
            <input type="number" id="p1-y" name='y' value={equation1.y} onChange={handleChangeE1} className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
              y
            </span>
          </div>
          <div className='rounded-full border w-4 h-4 flex items-center justify-center px-1 pb-2 pt-1.5 font-semibold'>
            <button onClick={(e) => setEquation1({ ...equation1, oz: equation1.oz == '+' ? '-' : '+' })}>{equation1.oz}</button>
          </div>
          <div className='flex'>
            <input type="number" id="p1-z" name='z' value={equation1.z} onChange={handleChangeE1} className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
              z
            </span>
          </div>
          <span> = </span>
          <input type="number" id="p1-e" name='equal' value={equation1.equal} onChange={handleChangeE1} className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
        </div >
        <div className="flex items-center gap-x-2">
          <label>Equation 2 : </label>
          <div className='rounded-full border w-4 h-4 flex items-center justify-center px-1 pb-2 pt-1.5 font-semibold'>
            <button onClick={(e) => setEquation2({ ...equation2, ox: equation2.ox == '+' ? '-' : '+' })}>{equation2.ox}</button>
          </div>
          <div className='flex'>
            <input type="number" id="p2-x" name='x' value={equation2.x} onChange={handleChangeE2} className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
              x
            </span>
          </div>
          <div className='rounded-full border w-4 h-4 flex items-center justify-center px-1 pb-2 pt-1.5 font-semibold'>
            <button onClick={(e) => setEquation2({ ...equation2, oy: equation2.oy == '+' ? '-' : '+' })}>{equation2.oy}</button>
          </div>
          <div className='flex'>
            <input type="number" id="p2-y" name='y' value={equation2.y} onChange={handleChangeE2} className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
              y
            </span>
          </div>
          <div className='rounded-full border w-4 h-4 flex items-center justify-center px-1 pb-2 pt-1.5 font-semibold'>
            <button onClick={(e) => setEquation2({ ...equation2, oz: equation2.oz == '+' ? '-' : '+' })}>{equation2.oz}</button>
          </div>
          <div className='flex'>
            <input type="number" id="p2-z" name='z' value={equation2.z} onChange={handleChangeE2} className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
              z
            </span>
          </div>
          <span> = </span>
          <input type="number" id="p2-e" name='equal' value={equation2.equal} onChange={handleChangeE2} className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
        </div >
        <div className="flex items-center gap-x-2">
          <label>Equation 3 : </label>
          <div className='rounded-full border w-4 h-4 flex items-center justify-center px-1 pb-2 pt-1.5 font-semibold'>
            <button onClick={(e) => setEquation3({ ...equation3, ox: equation3.ox == '+' ? '-' : '+' })}>{equation3.ox}</button>
          </div>
          <div className='flex'>
            <input type="number" id="p1-x" name='x' value={equation3.x} onChange={handleChangeE3} className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
              x
            </span>
          </div>
          <div className='rounded-full border w-4 h-4 flex items-center justify-center px-1 pb-2 pt-1.5 font-semibold'>
            <button onClick={(e) => setEquation3({ ...equation3, oy: equation3.oy == '+' ? '-' : '+' })}>{equation3.oy}</button>
          </div>
          <div className='flex'>
            <input type="number" id="p1-y" name='y' value={equation3.y} onChange={handleChangeE3} className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
              y
            </span>
          </div>
          <div className='rounded-full border w-4 h-4 flex items-center justify-center px-1 pb-2 pt-1.5 font-semibold'>
            <button onClick={(e) => setEquation3({ ...equation3, oz: equation3.oz == '+' ? '-' : '+' })}>{equation3.oz}</button>
          </div>
          <div className='flex'>
            <input type="number" id="p1-z" name='z' value={equation3.z} onChange={handleChangeE3} className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
              z
            </span>
          </div>
          <span> = </span>
          <input type="number" id="p1-e" name='equal' value={equation3.equal} onChange={handleChangeE3} className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="123" />
        </div >
        <button className='px-3 py-2 rounded-lg border-1 bg-gray-200 hover:bg-gray-300' onClick={() => calculate()}>Calculate</button>
      </div >
    </div >
  );
};

export default App;
