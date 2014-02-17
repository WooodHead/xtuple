<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                              xmlns:dia="http://www.lysator.liu.se/~alla/dia/">
  <xsl:output indent="no" method="xml"/>

  <xsl:template match="/">
    <positions>
      <xsl:apply-templates />
    </positions>
  </xsl:template>

  <xsl:template match="dia:object">
    <object>
      <xsl:if test="@type = 'UML - Class' or @type = 'UML - Dependency'">
        <xsl:attribute name="name">
          <xsl:value-of select="substring-before(substring-after(dia:attribute[@name='name'], '#'), '#')"/>
        </xsl:attribute>
        <xsl:attribute name="schema">
          <xsl:value-of select="substring-before(substring-after(dia:attribute[@name='stereotype'], '#'), '#')"/>
        </xsl:attribute>
        <xsl:apply-templates/>
      </xsl:if>
      <xsl:if test="@type = 'UML - Constraint'">
        <xsl:attribute name="name">
          <xsl:value-of select="substring-before(substring-after(dia:attribute[@name='constraint'], '#'), '#')"/>
        </xsl:attribute>
        <xsl:apply-templates/>
      </xsl:if>
    </object>
  </xsl:template>

  <xsl:template match="dia:attribute"/>

  <xsl:template match="dia:attribute[ 
                                     attribute::name='conn_endpoints' or
                                     attribute::name='connections' or
                                     attribute::name='elem_corner' or
                                     attribute::name='obj_bb' or
                                     attribute::name='obj_pos' or
                                     attribute::name='orth_points' or
                                     attribute::name='text_pos'
                                     ]">
      <xsl:copy-of select="."/>
  </xsl:template>

</xsl:stylesheet>
