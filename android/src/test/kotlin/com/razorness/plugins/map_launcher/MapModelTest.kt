package com.razorness.plugins.map_launcher

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class MapModelTest {

    @Test
    fun everyMapTypeHasExactlyOneModel() {
        for (mapType in MapType.entries) {
            assertEquals(mapType.name, 1, MAPS.count { it.mapType == mapType })
        }
    }

    @Test
    fun fromNameMatchesExactConstantNames() {
        assertEquals(MapType.mapyCz, MapType.fromName("mapyCz"))
        assertNull(MapType.fromName("apple"))
        assertNull(MapType.fromName("MAPY_CZ"))
        assertNull(MapType.fromName(null))
    }

    @Test
    fun toMapExposesAllFields() {
        val waze = MAPS.first { it.mapType == MapType.waze }
        assertEquals(
            mapOf("mapType" to "waze", "mapName" to "Waze", "packageName" to "com.waze", "urlPrefix" to "waze://"),
            waze.toMap()
        )
    }
}
