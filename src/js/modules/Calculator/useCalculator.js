import Calculator from "./Calculator"

const useCalculator = (aRef, bRef, cRef) => {
    const calc = new Calculator();
    return (operand) => {
        const A = (aRef.current.value);
        const B = (bRef.current.value);
        const C = calc[operand](calc.getEntity(A), calc.getEntity(B));
        cRef.current.value = C.toString();
    }
}

export default useCalculator;