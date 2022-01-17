## 흠 언제 다 정리하지!

function App () {

# 태그에 스타일이나 함수할땐 {}형태로 하지만 지정해서 써야 성능 up

# 애니메이션은 transform 으로..

# 컴포넌트 import할 때 lazy loading
    import 해야 할 시점에서
    import OOO from ''; 미리 선언안하고
    
    import { lazy, Suspense } from 'react'를 선언하고

    1. let OOO = lazy(()=> { return import('./')})
       let OOO = lazy(()=>  import('./'))
    2. 해당 컴포넌트에  <Suspense fallback={ 로딩바 등등 }> <OOO></OOO> </Suspense>


# setState
    let [name, setName] = useState('kim')
    setName('han')
    name = han으로 바뀌어있음.

20220117 -> 정리
update 예정..

}