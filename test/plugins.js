
import buble from 'rollup-plugin-buble'
import nodeBuiltins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import resolveNodeModule from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  plugins: [
    buble(),
    resolveNodeModule(),
    commonjs(),
    nodeBuiltins(),
    globals()
  ]
}