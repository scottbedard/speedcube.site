/**
 * The glue between Vue and Three
 *
 * @return {Object}
 */
export function useThree() {
    let obj;

    //
    // methods
    //

    /**
     * Get a component's 3D object.
     *
     * @return {Object3D}
     */
    const getThreeObj = () => obj;

    /**
     * Set a component's 3D object.
     *
     * @param {Object3D} val
     */
    const setThreeObj = (val) => { obj = val; };

    return {
        getThreeObj,
        setThreeObj,
    };
}
