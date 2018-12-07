<?php

namespace Speedcube\Speedcube\Classes;

class Utils
{
    /**
     * Deeply camel case the keys of an array.
     *
     * @param  {Array} arr
     * @return {Array}
     */
    public static function camelCaseKeys(array $arr)
    {
        $result = [];
        
        foreach ($arr as $key => $val) {
            $result[camel_case($key)] = is_array($val) 
                ? self::camelCaseKeys($val) 
                : $val;
        }

        return $result;
    }

    /**
     * Test if a string ends with another string.
     * 
     * @param  string   $haystack
     * @param  needle   $needle
     * @return boolean
     */
    public static function endsWith($haystack, $needle) {
        $length = strlen($needle);

        if ($length == 0) {
            return true;
        }

        return (substr($haystack, -$length) === $needle);
    }
    
    /**
     * Test if a string is JSON.
     * 
     * @param  {string}     $source
     * @return {boolean}
     */
    public static function isJson($source) 
    {
        return is_string($source) && json_decode($source) !== null;
    }
}