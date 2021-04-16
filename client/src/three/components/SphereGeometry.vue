<script lang="ts">
import { Mesh, MeshLambertMaterial, SphereGeometry } from 'three'
import { defineComponent } from 'vue'
import { 
  useColor,
  useColorProp,
  useDisposable,
  useHidden,
  useHiddenProp,
  useNesting,
  usePosition,
  usePositionProp,
} from '@/three/behaviors'

export default defineComponent({
  setup(props) {
    const geometry = new SphereGeometry(
      props.radius,
      props.widthSegments,
      props.heightSegments,
    )

    useDisposable(geometry)

    const material = new MeshLambertMaterial({
      wireframe: props.wireframe
    })

    useColor(material, () => props.color);
    useDisposable(material)

    const sphere = new Mesh(geometry, material)

    useHidden(sphere, () => props.hidden)
    useNesting(sphere)
    usePosition(sphere, () => props.position)
  },
  name: 'SphereGeometry',
  props: {
    color: useColorProp,
    heightSegments: {
      default: 12,
      type: Number,
    },
    hidden: useHiddenProp,
    position: usePositionProp,
    radius: {
      default: 1,
      type: Number,
    },
    size: {
      default: 1,
      type: Number,
    },
    widthSegments: {
      default: 16,
      type: Number,
    },
    wireframe: {
      default: true,
      type: Boolean,
    },
  },
})
</script>
  